import { reviewsApi } from "@/api/reviewsApi";
import { CreateReview } from "@/types/review.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostReviews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ proId, body }: { proId: string; body: CreateReview }) => {
      return reviewsApi.postReview(proId, body);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["product", data.data] });
      queryClient.refetchQueries({ queryKey: ["ratings", data.data] });
    },
    onError: () => {},
  });
};
