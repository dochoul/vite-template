import { usePostStore } from '../../store/post';

export function SetInterceptors(instance: any) {
  // 요청 인터셉터 추가하기
  instance.interceptors.request.use(
    (config) => {
      // 요청이 전달되기 전에 작업 수행
      //console.log(usePostStore.getState().token);

      config.headers.Authorization = usePostStore.getState().token;
      return config;
    },
    (error) =>
      // 요청 오류가 있는 작업 수행
      Promise.reject(error)
  );

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    (response: any) =>
      // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
      // 응답 데이터가 있는 작업 수행
      response,
    (error: any) =>
      // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
      // 응답 오류가 있는 작업 수행
      Promise.reject(error)
  );

  return instance;
}
