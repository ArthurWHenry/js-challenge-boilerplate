/**
 * Alert type
 *
 * @remarks This type is used to represent an alert message.
 */
export type Alert = {
  message: string;
  timeout: number;
  variant: AlertVariant;
};

/**
 * Alert variants type
 *
 * @remarks This type is used to represent the different alert variants.
 */
export type AlertVariant = 'success' | 'warning' | 'error' | 'information';

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
