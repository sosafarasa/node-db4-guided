
exports.up = function(knex) {

  // zoos, animals, species
  // zoos 1 ---- * animals
  //species 1 --- * animals

  return knex.schema.createTable('zoos', tbl => {
      tbl.increments();

      tbl.string('zoo_name', 128).notNullable().unique();
      tbl.string('address', 256).notNullable().unique();
  })
  .createTable('species', tbls => {
    tbl.increments();

    tbl.string('species_name', 128).notNullable().unique();
  })
  .createTable('animals', tbl => {
    tbl.increments();

    tbl.integer('species_id')
       .unsigned() //everytime you have a foreign key you need to specify unsigned to avoid -#
       .notNullable()
       .references('id')
       .inTable('species')
       .onDelete('RESTRICT') //what happens if the species is deleted -- RESTRICT: prevents you from deleting a record with dependants
       .onUpdate('CASCADE'); // what happens if the id of the species changes -- CASCADE: do the same thing with the dependant records

    tbl.integer('zoo_id')
       .unsigned()
       .notNullable()
       .references('id')
       .inTable('zoos')
       .onDelete('RESTRICT')
       .onUpdate('CASCADE')
  })


};

exports.down = function(knex) {
  
};
