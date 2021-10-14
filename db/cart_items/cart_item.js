const client = require('../client');

async function addItemToCart({cartId, proudctId, quantity}) {
    try {
        const {rows: [cartItem]} = await client.query(`
            INSERT cart_item(cart_id, product_id, quantity)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [cartId, proudctId, quantity]);
        return cartItem;
    } catch (error) {
        throw error;
    }
}

async function getCartItemById(id) {
    try {
        const {rows} = await client.query(`
            SELECT * 
            FROM cart_item
            WHERE id=${id}
            RETURNING *;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function updateCartItem({id, quantity}) {
    try {
        const {rows: [cartItem]} = await client.query(`
            UPDATE cart_item 
            SET quantity=${quantity}
            WHERE id=${id}
            RETURNING *;
        `);
        return cartItem;
    } catch (error) {
        throw error;
    }
}

async function getItemsByCartId(id) {
    try {
        const {rows} = await client.query(`
            SELECT * 
            FROM cart_item
            WHERE cart_id = ${id}
            RETURNING *;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function destroyCartItem(id) {
    try {
        const {rows} = await client.query(`
            DELETE FROM cart_item
            WHERE id = ${id};
        `);
        rows.id = id;
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addItemToCart,
    getCartItemById,
    updateCartItem,
    getCartItemById,
    destroyCartItem,
    getItemsByCartId
}