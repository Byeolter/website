const projects = {
  overwatch: {
    title: '오버워치 디펜스 모바일', kicker: '01 / MOBILE FAN PROJECT', image: 'overwatch.jpg',
    intro: '오버워치의 전투 경험을 모바일에서 구현한 교육용 팬 프로젝트입니다. 팀장으로 일정과 역할을 조율하고 게임 제작과 성능 개선에 참여했습니다.',
    period: '2025.07', role: '5인 팀 · 팀장', stack: 'Unity · C#',
    contributions: ['팀 일정 및 역할 분배 주도', '모바일 게임 제작과 플레이 동작 개선에 참여', '오브젝트 풀링을 적용해 프레임 드랍 문제 개선'],
    outcomes: ['실제로 플레이할 수 있는 모바일 팬게임 제작', 'SNS에 공개한 게임 소개 영상 조회수 약 2만 회 기록', '게임 시연 영상과 공개 저장소로 구현 결과 공유'],
    problem: '반복적으로 사용하는 객체를 풀에서 재사용하도록 처리해 프레임 드랍 문제를 개선했습니다. 게임이 동작하는 것뿐 아니라 플레이가 이어지는 감각을 중요하게 생각한 경험입니다.',
    note: '오버워치 IP를 활용한 비공식 교육용 팬 프로젝트입니다. Blizzard 또는 크래프톤의 공식 게임이 아닙니다.',
    links: [['GitHub', 'https://github.com/Unity-Bootcamp-13/NoAB-Official'], ['SNS 소개 영상', 'https://www.instagram.com/reel/DdTiZPDyvnZ/']], video: 'pIcuJyTsqkQ'
  },
  mnb: {
    title: 'MNB — VR 멀티플레이 숫자야구', kicker: '02 / VR MULTIPLAYER', image: 'mnb.jpg',
    intro: 'VR에서 두 플레이어가 실시간으로 대결하는 숫자야구 게임입니다. 팀장과 인게임 개발을 맡아 플레이 흐름과 네트워크 연결을 구현했습니다.',
    period: '2025.07–08', role: '5인 팀 · 팀장', stack: 'Unity · C# · UGS · Netcode for GameObjects',
    contributions: ['인게임 서버·클라이언트 구현', 'UGS 기반 백엔드·네트워크 담당', '지수 백오프 기반 재접속 처리로 연결 안정성 개선', '팀 일정 및 역할 조율'],
    outcomes: ['두 사용자가 함께 플레이하는 VR 숫자야구 제작', '네트워크 연결과 게임플레이를 함께 다룬 경험', '실제 VR 환경의 게임 시연 영상 제작'],
    problem: '네트워크 연결 실패 시 짧은 간격으로 재접속을 반복하는 대신, 재시도 사이의 대기 시간을 늘리는 지수 백오프 방식을 적용했습니다. 플레이어가 게임에 다시 참여하는 과정을 안정화하는 데 집중했습니다.',
    note: '로그인·매칭·전적·채팅 등의 기능은 팀 전체 결과물에 포함됩니다. 여기에는 본인이 담당한 인게임·네트워크 기여를 중심으로 기재했습니다.',
    links: [], video: 'Cq1wkxb3TKc'
  },
  templemoa: {
    title: '템플모아', kicker: '03 / AI-ASSISTED PRODUCT', image: 'templemoa.webp', product: true,
    intro: '템플스테이를 알아보며 느낀 모바일 탐색의 불편에서 시작했습니다. 일정을 찾고 등록하고 알림을 받는 서비스로 만들어 Web·iOS·Android에 출시했습니다.',
    period: '2026 · 운영 중', role: '개인 프로젝트 · 기획·검증·운영', stack: 'TypeScript · Supabase · Grafana',
    contributions: ['문제 정의와 일정 탐색·등록·알림·후기 기능 기획', 'GPT·Codex를 활용한 제작과 수정 지시', '생성된 화면·동작을 검증하고 오류 수정 및 모바일 UI 개선', '사용자 행동 모니터링 도입과 운영'],
    outcomes: ['Web·App Store·Google Play에 서비스 공개', '모니터링으로 실제 사용자 유입과 활성 사용자 추이 확인', '웹 중심의 초기 UI를 모바일 사용에 맞춰 개선'],
    problem: 'AI가 만든 결과를 그대로 완료로 보지 않았습니다. 실제 화면과 동작에서 불편을 발견하면 수정 방향을 전달했고, 출시 후에는 Supabase·Grafana로 이용 현황을 확인했습니다. 최근 이벤트가 멈춘 듯한 현상을 조사하며 대시보드 조회 기간 설정도 점검했습니다.',
    note: '코드 작성은 전적으로 AI를 활용했습니다. 본인의 기여는 문제 정의, 기능 기획, 결과 검증, 개선 방향 결정, 출시와 운영입니다. 후기는 기능을 마련한 단계이며, 이용 후기 축적 성과로 표현하지 않았습니다.',
    links: [['웹 서비스', 'https://templemoa.byeolter.com/'], ['App Store', 'https://apps.apple.com/us/app/templemoa-korea-temple-stay/id6794226869'], ['Google Play', 'https://play.google.com/store/apps/details?id=com.byeolter.templeguide']]
  },
  buddy: {
    title: '위젯버디', kicker: '04 / ANDROID IDLE PET GAME', image: 'widget-buddy.webp', product: true,
    intro: '홈 화면에서 작은 펫을 돌보는 방치형 게임입니다. Kotlin으로 기획부터 Google Play 출시까지 진행하고, 앱을 열지 않는 동안의 상태 변화를 구현했습니다.',
    period: '2025.11 초기 개발 · 이후 개선', role: '개인 프로젝트', stack: 'Kotlin · Compose · Glance · WorkManager · DataStore',
    contributions: ['Glance 기반 위젯 UI와 사용자 상호작용 구현', '타임스탬프 기반 경과 시간 계산으로 펫 상태 갱신', 'DataStore로 앱과 위젯의 상태 공유', 'Google Play 배포 및 이후 개선'],
    outcomes: ['홈 화면 위젯 기반 펫 게임 출시', '백그라운드 실행 지연에도 경과 시간에 맞춘 상태 반영', '앱·위젯·백그라운드 작업이 공유하는 상태 관리 경험'],
    problem: 'WorkManager가 정확한 간격으로 실행된다고 가정하지 않고, 실제 실행 시점과 마지막 갱신 시점의 차이로 경과 시간을 계산했습니다. 그동안 변했어야 할 펫의 상태를 반영해 실행 지연이 게임 상태의 시간 오차로 이어지지 않도록 개선했습니다.',
    note: '표시된 이미지는 앱 화면입니다. 홈 화면 위젯과의 상호작용은 시연 영상에서 확인할 수 있습니다.',
    links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.starterkim.widgetbuddy']], video: 'TjV3xrSg81Q'
  }
};

const cases = {
  runtime: {label:'OVERWATCH DEFENSE MOBILE / PERFORMANCE',title:'새로 만드는 대신, 다시 사용하기.',description:'오브젝트 풀링을 적용해 프레임 드랍 문제를 개선했습니다. 반복해서 필요한 객체를 재사용하는 구조로 바꾸며 모바일 플레이의 연속성을 다뤘습니다.',nodes:['객체 사용 요청','풀에서 가져오기','반납 · 재사용'],foot:['APPLIED / OBJECT POOLING','MOBILE GAME']},
  network: {label:'MNB / NETWORK RECOVERY',title:'연결이 끊겨도, 다음 시도를 준비하기.',description:'UGS 기반 네트워크를 담당하며 지수 백오프를 재접속 처리에 적용했습니다. 재시도 간격을 조절해 연결 실패 이후의 흐름을 개선했습니다.',nodes:['연결 실패','대기 간격 증가','재접속 시도'],foot:['APPLIED / EXPONENTIAL BACKOFF','VR MULTIPLAYER']},
  background: {label:'WIDGET BUDDY / BACKGROUND STATE',title:'실행 횟수보다, 실제로 흐른 시간.',description:'Android 백그라운드 작업은 늦어질 수 있습니다. 마지막 갱신 이후의 시간을 계산해 펫 상태에 반영하고, DataStore로 앱과 위젯이 같은 상태를 사용하게 했습니다.',nodes:['실제 경과 시간','펫 상태 계산','앱 · 위젯 반영'],foot:['APPLIED / TIMESTAMP + DATASTORE','ANDROID']}
};

const projectDialog = document.querySelector('#project-dialog');
const videoDialog = document.querySelector('#video-dialog');
const dialogContent = document.querySelector('#dialog-content');
let projectTrigger;
let videoTrigger;

function setScrollLock() { document.body.classList.toggle('modal-open', projectDialog.open || videoDialog.open); }

function openProject(id, trigger) {
  const p = projects[id];
  if (!p) return;
  projectTrigger = trigger;
  dialogContent.innerHTML = `
    <div class="dialog-hero ${p.product?'product-hero':''}"><img src="./assets/${p.image}" alt="${p.title} 실제 화면"></div>
    <div class="dialog-body"><span class="dialog-kicker">${p.kicker}</span><h2 id="dialog-title">${p.title}</h2><p class="dialog-intro">${p.intro}</p>
    <div class="detail-meta"><span><b>기간</b>${p.period}</span><span><b>역할</b>${p.role}</span><span><b>기술</b>${p.stack}</span></div>
    <div class="detail-columns"><div><h3>내가 맡은 일</h3><ul>${p.contributions.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h3>결과와 경험</h3><ul>${p.outcomes.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>
    <div class="detail-case"><h3>문제와 해결 방식</h3><p>${p.problem}</p></div>
    <div class="detail-links">${p.video?`<button data-video="${id}">시연 영상 보기 ↗</button>`:''}${p.links.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`).join('')}</div>
    <p class="detail-note">${p.note}</p></div>`;
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
  setScrollLock();
}

function openVideo(id, trigger) {
  const p = projects[id];
  if (!p?.video) return;
  videoTrigger = trigger;
  document.querySelector('#video-content').innerHTML = `<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${p.video}?autoplay=1&rel=0" title="${p.title} 시연 영상" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="video-fallback">영상이 표시되지 않으면 <a href="https://www.youtube.com/watch?v=${p.video}" target="_blank" rel="noopener">YouTube에서 시연 보기 ↗</a></div>`;
  videoDialog.showModal();
  setScrollLock();
}

document.addEventListener('click', e => {
  const projectButton = e.target.closest('[data-project]');
  const videoButton = e.target.closest('[data-video]');
  if (projectButton) openProject(projectButton.dataset.project, projectButton);
  else if (videoButton) openVideo(videoButton.dataset.video, videoButton);
});

document.querySelector('.dialog-close').addEventListener('click',()=>projectDialog.close());
document.querySelector('.video-close').addEventListener('click',()=>videoDialog.close());
projectDialog.addEventListener('close',()=>{setScrollLock();projectTrigger?.focus();});
videoDialog.addEventListener('close',()=>{document.querySelector('#video-content').replaceChildren();setScrollLock();videoTrigger?.focus();});
for (const dialog of [projectDialog,videoDialog]) dialog.addEventListener('click',e=>{
  if(e.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();
});

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  document.querySelectorAll('.project').forEach(p=>p.hidden=filter!=='all'&&p.dataset.category!==filter);
  document.querySelector('.projects-grid').classList.toggle('filtered',filter!=='all');
}));

function selectCase(key) {
  const c=cases[key];
  document.querySelectorAll('[data-case]').forEach(b=>{const selected=b.dataset.case===key;b.classList.toggle('active',selected);b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});
  const panel=document.querySelector('#approach-panel');
  panel.setAttribute('aria-labelledby',`tab-${key}`);
  panel.innerHTML=`<div><span class="case-label">${c.label}</span><h3>${c.title}</h3><p class="case-description">${c.description}</p><div class="flow">${c.nodes.map((node,i)=>`${i?'<span class="flow-arrow" aria-hidden="true">→</span>':''}<span class="flow-node ${i===1?'accent':''}">${node}</span>`).join('')}</div></div><div class="case-foot"><span>${c.foot[0]}</span><span>${c.foot[1]}</span></div>`;
}
const caseButtons=[...document.querySelectorAll('[data-case]')];
caseButtons.forEach((button,index)=>{
  button.addEventListener('click',()=>selectCase(button.dataset.case));
  button.addEventListener('keydown',e=>{
    let next;
    if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(index+1)%caseButtons.length;
    if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(index+caseButtons.length-1)%caseButtons.length;
    if(e.key==='Home')next=0;if(e.key==='End')next=caseButtons.length-1;
    if(next!==undefined){e.preventDefault();selectCase(caseButtons[next].dataset.case);caseButtons[next].focus();}
  });
});
selectCase('runtime');

const menuToggle=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('.mobile-nav');
menuToggle.addEventListener('click',()=>{
  const open=menuToggle.getAttribute('aria-expanded')!=='true';
  menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');mobileNav.hidden=!open;
});
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','메뉴 열기');mobileNav.hidden=true;}
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
