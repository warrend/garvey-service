/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('practice', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(1000)', notNull: true },
    street: { type: 'varchar(1000)', notNull: true },
    city: { type: 'varchar(1000)', notNull: true },
    state: { type: 'varchar(2)', notNull: true },
    zip: { type: 'varchar(1000)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('practice');
};
