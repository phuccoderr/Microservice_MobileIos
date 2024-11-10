import { reviewsApi } from "@/api/reviewsApi";
import { PaginationResponse } from "@/types/pagination.type";
import { Review } from "@/types/review.type";
import { useQuery } from "@tanstack/react-query";

export const useGetRatings = (proId: string) => {
  return useQuery<PaginationResponse<Review>>({
    queryKey: ["ratings", proId],
    queryFn: async () => {
      return (await reviewsApi.getRating(proId)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
