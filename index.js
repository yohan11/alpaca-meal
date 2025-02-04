const lunchMenus = [
    "김치찌개", "된장찌개", "순두부찌개", "부대찌개", "청국장찌개",
    "제육볶음", "불고기", "닭갈비", "오징어볶음", "갈치조림",
    "고등어구이", "삼겹살 정식", "수육국밥", "돼지국밥", "설렁탕",
    "육개장", "감자탕", "찜닭", "낙지볶음", "콩나물국밥",
    "김밥 + 라면", "떡볶이 + 순대", "잔치국수", "비빔국수", "칼국수",
    "쫄면", "우동", "냉면", "막국수", "쌀국수",
    "짜장면", "짬뽕", "볶음밥", "마파두부 덮밥", "깐풍기",
    "초밥", "돈카츠", "규동", "라멘", "가라아게 정식",
    "햄버거", "샌드위치", "파스타", "스테이크 덮밥", "리조또",
    "타코", "케밥", "샐러드", "치킨", "피자"
  ];
  
  document.querySelector("button").addEventListener("click", () => {
    const menuElement = document.querySelector(".menu");
    const randomMenu = lunchMenus[Math.floor(Math.random() * lunchMenus.length)];
    
    menuElement.textContent = `오늘의 메뉴는 ${randomMenu}! 🍽️`;
    menuElement.classList.add("show"); // 애니메이션 적용



  });

  var container = document.getElementById('map');
  var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
  };

  var map = new kakao.maps.Map(container, options);
