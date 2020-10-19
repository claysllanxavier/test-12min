import { createConnection, getConnection } from "typeorm";

const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  get() {
    return getConnection();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    const promises = entities.map((entity) => {
      const repository = connection.getRepository(entity.name);
      return repository.query(`DELETE FROM ${entity.tableName}`);
    });

    await Promise.all(promises);
  },
};
export default connection;
