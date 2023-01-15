interface MutationResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export default MutationResponse;
