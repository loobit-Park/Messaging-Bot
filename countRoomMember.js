// importing classes
const Thread = java.lang.Thread;
const Jsoup = org.jsoup.Jsoup;

let room_raw = ["https://open.kakao.com/o/gz0HkcKb"]; //사용할 방 주소 순서대로 추가하시면 됩니다.
let room_names = ["Test"]; //사용할 방 이름 정확하게 순서대로 추가하시면 됩니다.
let data_real = [{result: {headcount: null}}, {result: {headcount: null}}];
let data_pre = [{result: {headcount: null}}, {result: {headcount: null}}];

let loopStarted = false;

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if (!loopStarted) {
      loopStarted = true;
      
      while (true) {
         updateData();
         
         for (let i = 0; i < room_raw.length; i ++) {
            if (data_pre[i].result.headcount != null) {
               if (data_real[i].result.headcount > data_pre[i].result.headcount)
                  Api.replyRoom(room_names[i], "[알림] 누군가 방을 들어왔어요!\n 인원: "+data_pre[i].result.headcount+"↗"+data_real[i].result.headcount);
               
               else if (data_real[i].result.headcount < data_pre[i].result.headcount)
                  Api.replyRoom(room_names[i], "[알림] 누군가 방을 나갔어요!\n 인원: "+data_pre[i].result.headcount+"↘"+data_real[i].result.headcount);
            }
         }      
         
         Thread.sleep(750);
      }
   }
}

updateData = () => {
   for (let i = 0; i < room_raw.length; i ++) {
      data_pre[i] = data_real[i]; // copy previous data_real to data_pre
      
      let obj = JSON.parse(Jsoup.connect("https://api.develope.kr/search/room?room=" + room_raw[i]).ignoreContentType(true).get().text());
      data_real[i] = obj;
   }
}
// API 관련 자유게시판 글 먼저 읽어주세요. 댓글에 링크 올리겠습니다.
// <Copyright 2019. KeonWoo PARK. All rights reserved.>
// 이 소스코드는 예시용으로 제작되었으며 비상업적인 목적으로만 수정 및 사용이 가능합니다.
// 저작권자의 허락 없이 상업적 사용, 2차 무단 배포 및 무단 수정을 금합니다.
// 관련 사항에 대해 문의하시려면 parkkw472@develope.kr