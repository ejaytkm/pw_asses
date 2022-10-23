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


  createIngredientOutlet(
    input: IngredientOutletInput!
  ): IngredientOutlet!

  updateIngredientOutlet(
    filter: IngredientOutletFilterInput,
    input: IngredientOutletInput!
  ): IngredientOutlet!

  deleteIngredientOutlet(
    filter: IngredientOutletDeleteFilterInput!,
  ): IngredientOutlet!


  createUserOutlet(
    input: UserOutletInput!
  ): UserOutlet!

  updateUserOutlet(
    filter: UserOutletFilterInput,
    input: UserOutletInput!
  ): UserOutlet!

  deleteUserOutlet(
    filter: UserOutletDeleteFilterInput!,
  ): UserOutlet!
}
`