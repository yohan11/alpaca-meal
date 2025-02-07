import config from "./appkey.js";
import menuData from './data.json' with { type: "json" };
const API_KEY  = config.API_KEY || process.env.API_KEY;

const lunchMenus = menuData

let link; // a 태그를 저장할 변수

document.querySelector("button").addEventListener("click", () => {
  const menuElement = document.querySelector(".menu");
  const randomMenu = lunchMenus[Math.floor(Math.random() * lunchMenus.length)];

  const menuDescriptionElement = document.querySelector(".menu_description");

  menuElement.textContent = `오늘은 ${randomMenu.place_name} 가는 거 어때요?`;
  menuDescriptionElement.textContent = `${randomMenu.place_name}은(는) ${randomMenu.category_name.split(">")[randomMenu.category_name.split(">").length - 1]}을(를) 팔아요. 우리 회사에서 ${randomMenu.distance}m 떨어져 있네요^^ 걸어서 약 ${((randomMenu.distance / 5000) * 60).toFixed(0)}분 걸려요!`;
  
  menuElement.classList.add("show"); // 애니메이션 적용
  menuDescriptionElement.classList.add("show"); // 애니메이션 적용

  // 기존 링크가 있으면 제거
  if (link) {
    link.remove();
  }

  // 새로 링크 생성
  link = document.createElement('a');
  
  // 링크에 속성 추가
  link.href = randomMenu.place_url;  // 원하는 URL로 변경
  link.textContent = "식당 정보가 궁금하다면?";  // 링크 텍스트
  link.target="_blank"
  
  // 링크 스타일링 (선택사항)
  link.style.color = '#3674B5';
  link.style.textDecoration = 'underline';
  link.style.fontSize = '18px';

  document.body.appendChild(link);
  initializeMap(randomMenu);
});


function loadKakaoMapScript() {
  return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Kakao Map API script'));
      document.head.appendChild(script);
  });
}

function initializeMap(randomMenu) {
  kakao.maps.load(function () {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(randomMenu.y, randomMenu.x),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    
    // 회사 위치
    const company = {
      y : 37.4940653,
      x : 127.0341499
    };
    
    // 회사 위치 마커
    const companyMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(company.y, company.x),
      map: map
    });
    
    // 식당 위치 마커
    const restaurantMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(randomMenu.y, randomMenu.x),
      map: map
    });
    
    // 경로 그리기
    const linePath = [
      new kakao.maps.LatLng(company.y, company.x),
      //여기에 경로 좌표들을 넣는다.
      new kakao.maps.LatLng(randomMenu.y, randomMenu.x)
    ];
    
    // 지도 범위 재설정
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(company.y, company.x));
    bounds.extend(new kakao.maps.LatLng(randomMenu.y, randomMenu.x));
    map.setBounds(bounds);
    
    // 선 그리기
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 3,
      strokeColor: '#db4040',
      strokeOpacity: 0.7,
      strokeStyle: 'solid'
    });
      
    polyline.setMap(map);
    
    // 마커에 인포윈도우 추가
    const companyInfo = new kakao.maps.InfoWindow({
      content: '<div style="padding:5px;">회사</div>'
    });
    
    const restaurantInfo = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">${randomMenu.place_name}</div>`
    });
    
    // 마커에 마우스오버 이벤트 추가
    kakao.maps.event.addListener(companyMarker, 'mouseover', function() {
      companyInfo.open(map, companyMarker);
    });
    kakao.maps.event.addListener(restaurantMarker, 'mouseover', function() {
      restaurantInfo.open(map, restaurantMarker);
    });
    
    // 마커에 마우스아웃 이벤트 추가
    kakao.maps.event.addListener(companyMarker, 'mouseout', function() {
      companyInfo.close();
    });
    kakao.maps.event.addListener(restaurantMarker, 'mouseout', function() {
      restaurantInfo.close();
    });
    
  });
}

loadKakaoMapScript()
.then(() => {
  // 초기 지도 로드 (기본 좌표)
  const defaultLocation = {
      y: 37.4940653, // 기본 식당의 y 좌표
      x: 127.0341499, // 기본 식당의 x 좌표
      place_name: "AlpacaX" // 기본 식당 이름
  };
  initializeMap(defaultLocation); // randomMenu 객체를 사용하여 초기화
})
.catch(error => console.error(error));