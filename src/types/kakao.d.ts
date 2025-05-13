export {}; // 글로벌 선언을 모듈로 감싸기 위해 필요

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      // ✅ load 함수 타입 정의 (autoload=false 대응)
      function load(callback: () => void): void;

      class Map {
        constructor(container: HTMLElement, options: {
          center: LatLng;
          level: number;
        });
        setCenter(latlng: LatLng): void;
        getCenter(): LatLng;
      }

      class LatLng {
        constructor(lat: number, lng: number);
      }

      class Marker {
        constructor(options: {
          position: LatLng;
          map?: Map;
        });
        setMap(map: Map | null): void;
      }

      class Circle {
        constructor(options: {
          center: LatLng;
          radius: number;
          strokeWeight: number;
          strokeColor: string;
          strokeOpacity: number;
          fillColor: string;
          fillOpacity: number;
          map?: Map;
        });
        setMap(map: Map | null): void;
      }

      class CustomOverlay {
        constructor(options: {
          position: LatLng;
          content: string;
          yAnchor?: number;
        });
        setMap(map: Map | null): void;
      }

      namespace services {
        // ✅ Status 정의
        type Status = "OK" | "ZERO_RESULT" | "ERROR";

        interface PlacesSearchResult {
          id: string;
          place_name: string;
          address_name: string;
          road_address_name: string;
          phone: string;
          x: string;
          y: string;
        }

        interface Pagination {
          hasNextPage: () => boolean;
          nextPage: () => void;
        }

        class Places {
          categorySearch(
            category: string,
            callback: (
              data: PlacesSearchResult[],
              status: Status,
              pagination: Pagination
            ) => void,
            options?: {
              location: LatLng;
              radius?: number;
            }
          ): void;
        }
      }
    }
  }
}
