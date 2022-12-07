const db = require('../../database');

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : ' ';

    const rows = await db.query(
      `
        SELECT *
        FROM categories
        ORDER BY name ${direction}`,
    );

    return rows;
  }

  async findById(id) {
    const [category] = await db.query(
      `
        SELECT * FROM categories WHERE id = $1
      `,
      [id],
    );

    return category;
  }

  async create({ name }) {
    const [row] = await db.query(
      `
        INSERT INTO categories(name)
        VALUES($1)
        RETURNING *
      `,
      [name],
    );

    return row;
  }

  async update(id, { name }) {
    const [category] = await db.query(
      `
        UPDATE categories
        SET name = $1
        WHERE id = $2
        RETURNING *
      `,
      [name, id],
    );

    return category;
  }

  async delete(id) {
    const [category] = await db.query(
      'DELETE FROM categories WHERE id = $1',
      [id],
    );

    return category;
  }
}

module.exports = new CategoriesRepository();
