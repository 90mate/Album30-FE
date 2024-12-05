import React from "react";
import "./AlbumDetail.css"; // 스타일링 파일

function AlbumDetail() {
  return (
    <div className="album-detail">
      {/* 헤더 */}
      <div className="header">
        <button className="back-button">◀</button>
        <button className="share-button">🔗</button>
      </div>

      {/* 앨범 이미지 및 정보 */}
      <div className="album-image">
        <p>
          앨범 이미지는 고객의 이해를 돕기 위해 식별 목적으로 사용하고 있어요.<br/>
          촬영 환경에 따라 실제 앨범의 이미지 크기 및 위치가 다를 수 있어요.
        </p>
        <img
            src="앨범 이미지 URL"
            className="album-image"
        />
      </div>
      <div className="album-info">
        <h2>NCT WISH</h2>
        <p>Songbird (Jaehee Ver.) (초회생산한정반)</p>

        {/* CD 및 거래가 */}
        <div className="album-meta">
          <span className="cd-tag">CD</span>
          <p>1:1 거래가: <span>-</span></p>
        </div>

      </div>

      {/* 매칭 히스토리 */}
      <div className="matching-history">
        <h3>1:1 매칭 히스토리</h3>
        <p>아직 매칭 기록이 없어요</p>
      </div>

      {/* 희망 거래 가격 */}
      <div className="price-section">
        <h3>희망 거래 가격</h3>
        <div className="price-inputs">
          <input type="text" placeholder="구매 희망 가격" />
          <input type="text" placeholder="판매 희망 가격" />
        </div>
        <p>아직 구매 희망자가 없어요</p>
      </div>

      {/* 하단 문구 */}
      <div className="footer-note">
        <p>
          (주)프로덕트 이름은... <br />
          추가적인 법적 설명...
        </p>
      </div>

      {/* 버튼들 */}
      <div className="actions">
        <button className="like-button">❤️</button>
        <button className="buy-button">살래요</button>
        <button className="sell-button">팔래요</button>
      </div>
      
    </div>
  );
}

export default AlbumDetail;

// 이미지와 데이터를 props 활용해 전달 

// function AlbumDetail({ album }) {
//   return (
//     <div className="album-detail">
//       <img src={album.imageUrl} alt={album.title} />
//       <h2>{album.title}</h2>
//       <p>{album.description}</p>
//     </div>
//   );
// }

// // 사용 예
// <AlbumDetail album={{ imageUrl: 'URL', title: 'NCT WISH', description: 'Songbird' }} />
