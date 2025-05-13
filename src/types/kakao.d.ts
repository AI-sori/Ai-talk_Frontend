// src/types/kakao.d.ts
export {}; // 모듈로 인식되도록 강제

declare global {
  interface Window {
    kakao: any;
  }

  namespace kakao {
    namespace maps {
      class Map {
        constructor(container: HTMLElement, options: any);
        setCenter(latlng: any): void;
        setLevel(level: number): void;
        // 필요 시 더 추가
      }

      class LatLng {
        constructor(lat: number, lng: number);
      }

      class Marker {
        constructor(options: any);
        setMap(map: any): void;
      }

      class InfoWindow {
        constructor(options: any);
        open(map: any, marker: any): void;
        close(): void;
      }

      // 등등 필요한 것들 추가
    }
  }
}
