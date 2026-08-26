import { getFilteredOverview } from "./mock";

const apiClient = {
  async get(_path, filters) {
    return getFilteredOverview(filters);
  },
};

export async function getOverview(filters) {
  return apiClient.get("/analytics/overview", filters);
}
