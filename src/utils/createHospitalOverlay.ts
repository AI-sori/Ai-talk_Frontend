// src/utils/createHospitalOverlay.ts

export const createHospitalOverlay = (map: kakao.maps.Map, lat: number, lng: number, index: number) => {
    const content = `
      <div class="custom-marker">
        <span>${index}</span>
      </div>
    `;
  
    const overlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(lat, lng),
      content,
      yAnchor: 1,
    });
  
    overlay.setMap(map);
    return overlay;
  };
  