import menuData from './data.json' with { type: "json" };


const lunchMenus = menuData

let link; // a 태그를 저장할 변수

document.querySelector("button").addEventListener("click", () => {
  const menuElement = document.querySelector(".menu");
  const randomMenu = lunchMenus[Math.floor(Math.random() * lunchMenus.length)];

  const menuDescriptionElement = document.querySelector(".menu_description");

  menuElement.textContent = `오늘은 ${randomMenu.place_name} 가는 거 어때요?`;
  menuDescriptionElement.textContent = `${randomMenu.place_name}은(는) ${randomMenu.category_name.split(">")[randomMenu.category_name.split(">").length - 1]}을 팔아요. 우리 회사에서 ${randomMenu.distance}m 떨어져 있네요^^ 걸어서 약 ${((randomMenu.distance / 5000) * 60).toFixed(0)}분 걸려요!`;
  
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
  
  // 페이지에 추가
  document.body.appendChild(link);
});

