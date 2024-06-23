// Types
import type { Policy, ResponseId, PostResponse } from '../types';
type PostPolicyNumbersResponse = ResponseId & { policies: Policy[] };

/**
 * Post policy numbers to the server.
 * @param {Policy[]} policies - The policies to post.
 * @returns {Promise<PostResponse>} The response from the server.
 *
 * @example
 * ```typescript
 * postPolicyNumbers({
 *   policies: [
 *     { policyNumber: '457500000', isValid: 'valid' },
 *     { policyNumber: '457500001', isValid: 'error' },
 *   ],
 * });
 * ```
 */
export async function postPolicyNumbers({
  policies,
}: {
  policies: Policy[];
}): Promise<PostResponse> {
  const response: Response = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      method: 'POST',
      body: JSON.stringify({
        policies: [...policies],
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );

  if (!response.ok) {
    return {
      status: 'error',
      code: response.status ?? null,
      responseId: null,
      data: null,
    };
  }

  const data: PostPolicyNumbersResponse = await response.json();

  return {
    status: 'success',
    code: response.status ?? null,
    responseId: data.id,
    data: data.policies ?? null,
  };
}
