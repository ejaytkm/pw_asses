module.exports = `
type Mutation {
  createIngredient(
    input: IngredientInput!
  ): Ingredient!

  updateIngredient(
    filter: IngredientFilterInput,
    input: IngredientInput!
  ): Ingredient!

  deleteIngredient(
    filter: IngredientDeleteFilterInput!,
  ): Ingredient!


  createOutlet(
    input: OutletInput!
  ): Outlet!

  updateOutlet(
    filter: OutletFilterInput,
    input: OutletInput!
  ): Outlet!

  deleteOutlet(
    filter: OutletDeleteFilterInput!,
  ): Outlet!
}
`