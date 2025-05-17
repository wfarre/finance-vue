import { onMounted, ref } from "vue";

export const useFetch = <T>(url: string) => {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const isLoading = ref(false);

  const fetchData = async () => {
    isLoading.value = true;
    try {
      const res = await fetch(url);
      const json = await res.json();
      data.value = json.results;
    } catch (err) {
      error.value = err as Error;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchData);
  return { data, error, isLoading, refetch: fetchData };
};
