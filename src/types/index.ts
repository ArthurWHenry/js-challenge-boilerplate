/**
 * Policy type
 *
 * @remarks This type is used to represent a policy record in the table.
 */
export type Policy = {
  isValid: string;
  policyNumber: string;
};

/**
 * ResponseId type
 *
 * @remarks This type is used to represent the id that is returned from the POST request.
 */
export type ResponseId = {
  id: string;
};
