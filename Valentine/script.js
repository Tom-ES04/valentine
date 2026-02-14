const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const card = document.querySelector(".card"); // để giới hạn vùng nút No
const buttons = document.querySelector(".buttons");

const offset = 100; // khoảng cách tối thiểu so với chuột
const padding = 5;  // tránh chạm biên card

function moveButton(event) {
  // Chuyển sang absolute khi hover lần đầu
  if (noBtn.style.position !== "absolute") {
    const rect = noBtn.getBoundingClientRect();
    const parentRect = buttons.getBoundingClientRect();
    noBtn.style.position = "absolute";
    noBtn.style.left = rect.left - parentRect.left + "px";
    noBtn.style.top = rect.top - parentRect.top + "px";
  }

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  // Lấy kích thước vùng chứa (card)
  const maxX = card.clientWidth - btnWidth - padding;
  const maxY = card.clientHeight - btnHeight - padding;

  let newX, newY;
  let attempts = 0;

  do {
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
    attempts++;

    const mouseX = event.clientX - card.getBoundingClientRect().left;
    const mouseY = event.clientY - card.getBoundingClientRect().top;

    const dist = Math.hypot(mouseX - (newX + btnWidth/2), mouseY - (newY + btnHeight/2));

    // nếu đủ xa con trỏ, thoát vòng lặp
    if (dist >= offset) break;
  } while (attempts < 100);

  // tránh chồng nút Yes
  const yesWidth = yesBtn.offsetWidth;
  if (newX < yesWidth + padding) newX = yesWidth + padding;

  // áp dụng vị trí mới
  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
}

// chỉ di chuyển khi hover chuột
noBtn.addEventListener("mouseover", moveButton);

// optional: click No cũng di chuyển
noBtn.addEventListener("click", moveButton);

// click Yes hiển thị chữ + ảnh
yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <div class="yay-container">
      <h1>YAY 💖</h1>
      <img src="love.jpg" alt="Love" />
    </div>
  `;
});
