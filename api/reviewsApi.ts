import { reviewsAxiosClient } from "@/api/axiosClient";
import { CreateReview } from "@/types/review.type";

export const reviewsApi = {
  postReview(proId: string, body: CreateReview) {
    const url = `/post_review/${proId}`;
    return reviewsAxiosClient.post(url, body);
  },
  canReview(customer_id: string, product_id: string) {
    const url = `/can_review`;
    return reviewsAxiosClient.get(url, { params: { customer_id, product_id } });
  },
  getRating(proId: string) {
    const url = `/ratings/${proId}`;
    return reviewsAxiosClient.get(url);
  },
};
