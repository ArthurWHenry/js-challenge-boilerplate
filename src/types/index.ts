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

/**
 * SubmitPolicyResponse type
 *
 * @remarks This type is used to represent the response from the POST request.
 */
export type PostResponse = {
  status: string;
  code: number | null;
  responseId: string | null;
  data: Policy[] | null;
};
