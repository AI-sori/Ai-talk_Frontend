export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      class Map {
        constructor(container: HTMLElement, options: any);
        setCenter(latlng: LatLng): void;
        getCenter(): LatLng;
      }

      class LatLng {
        constructor(lat: number, lng: number);
      }

      class Marker {
        constructor(options: { position: LatLng; map?: Map });
        setMap(map: Map | null): void;
      }

      class Circle {
        constructor(options: any);
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
        class Places {
          categorySearch(
            code: string,
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

        interface PlacesSearchResult {
          id: string;
          place_name: string;
          address_name: string;
          road_address_name: string;
          phone: string;
          x: string;
          y: string;
        }

        type Status = 'OK' | 'ZERO_RESULT' | 'ERROR';

        interface Pagination {
          hasNextPage: () => boolean;
          nextPage: () => void;
        }
      }
    }
  }
}
