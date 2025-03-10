export const FOOD_CATEGORY = [
  "한식",
  "감자탕",
  "일식",
  "우동,소바",
  "국수",
  "음식점",
  "이탈리아음식",
  "족발,보쌈",
  "양식",
  "햄버거",
  "중식",
  "중식당",
  "퓨전음식",
  "일식당",
  "육류,고기요리",
  "닭갈비",
  "돼지고기구이",
  "아시아음식",
  "브런치",
  "베트남음식",
  "분식",
  "김밥",
  "곱창,막창,양",
  "일본식라면",
  "샌드위치",
  "피자",
  "돈가스",
  "해장국",
  "태국음식",
  "덮밥",
  "초밥,롤",
  "도시락,컵밥",
  "다이어트,샐러드",
  "스파게티,파스타전문",
  "찌개,전골",
  "냉면",
  "멕시코,남미음식",
  "칼국수,만두",
  "프랑스음식",
  "종합분식",
  "주꾸미요리",
  "순대,순댓국",
  "양갈비",
  "샤브샤브",
  "장어,먹장어요리",
  "소고기구이",
  "국밥",
  "닭요리",
  "백반,가정식",
  "찜닭",
  "전,빈대떡",
  "떡볶이",
];

export const CAFE_CATEGORY = [
  "카페",
  "토스트",
  "카페,디저트",
  "베이커리",
  "케이크전문",
  "샌드위치",
  "차",
  "도넛",
  "다이어트,샐러드",
  "핫도그",
  "브런치",
];
export const DINNER_CATEGORY = [
  "맥주,호프",
  "바(BAR)",
  "족발,보쌈",
  "조개요리",
  "매운탕,해물탕",
  "돼지고기구이",
  "소고기구이",
  "육류,고기요리",
  "양꼬치",
  "술집",
  "요리주점",
  "이자카야",
  "전통,민속주점",
  "전,빈대떡",
  "양갈비",
  "포장마차",
  "생선회",
  "추어탕",
  "복어요리",
  "곱창,막창,양",
  "와인",
  "프랑스음식",
];



// 네이버맵 Console 호출
// let items = [];
// let getFoodList = async (keyword, page) => {
//   fetch(
//     `https://map.naver.com/p/api/search/allSearch?query=${encodeURIComponent(keyword)}&type=all&searchCoord=127.02272261085858%3B37.520541974950504&placeSearchOption=clientX%3D127.04965%26clientY%3D37.542108%26display%3D70%26entry%3Dbmp%26x%3D127.04964994606178%26y%3D37.542107999999786&boundary=127.01947699714782%3B37.51565317758033%3B127.02611710593311%3B37.5253123766381&displayCount=100&page=${page}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//         items = [
//           ...items,
//           ...data.result.place.list.map((item) => ({
//             id: item.id,
//             category: item.category,
//             display: item.display,
//             menuInfo: item.menuInfo,
//           })),
//         ];
//           console.log(items);
//     })
//     .catch((e) => console.log(e));
// }

// let onSubmit = (keyword) => {
//   for (let i = 1; i < 5; i++) {
//     setTimeout(() => {
//       getFoodList(keyword, i);
//     }, i * 1000);
//   }
// };
// onSubmit('밥집')
