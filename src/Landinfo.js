import { useLocation } from "react-router-dom";
import "./Landinfo.css";
// function Landinfo() {
//   const location = useLocation();
//   const responseData = location.state && location.state.responseData;

//   // responseData 값을 사용할 수 있음
//   console.log("responseData 값:", responseData);

//   // 나머지 컴포넌트 코드
// }
function Landinfo() {
  const location = useLocation();
  const responseData = location.state && location.state.responseData;

  // responseData가 존재하지 않는 경우 빈 객체로 초기화
  const {
    lid,
    nameKo,
    nameEn,
    mainImage,
    mainImagePath,
    subimage1,
    subImage1Path,
    subimage2,
    subImage2Path,
    subimage3,
    subImage3Path,
    subimage4,
    subImage4Path,
    subimage5,
    subImage5Path,
    addressKo,
    addressEn,
    tel,
    mapUrl,
    linfoKo,
    linfoEn,
  } = responseData || {};
  const getImagePath = (image, imagePath) => {
    return imagePath ? `${imagePath}${image}` : image;
  };
  return (
    <div>
      {responseData ? (
        <div>
          <h3>
            {nameKo} ({nameEn})
          </h3>
          <img
            src={
              process.env.PUBLIC_URL + getImagePath(mainImage, mainImagePath)
            }
            alt=""
          />
          <p>
            위치: {addressKo} ({addressEn})
          </p>
          <p>전화번호: {tel}</p>

          {/* 이미지 표시 */}

          <div className="image-container">
            <img
              className="image-item"
              src={
                process.env.PUBLIC_URL + getImagePath(subimage1, subImage1Path)
              }
              alt=""
            />
            <img
              className="image-item"
              src={
                process.env.PUBLIC_URL + getImagePath(subimage2, subImage2Path)
              }
              alt=""
            />
            <img
              className="image-item"
              src={
                process.env.PUBLIC_URL + getImagePath(subimage3, subImage3Path)
              }
              alt=""
            />
            <img
              className="image-item"
              src={
                process.env.PUBLIC_URL + getImagePath(subimage4, subImage4Path)
              }
              alt=""
            />
            <img
              className="image-item"
              src={
                process.env.PUBLIC_URL + getImagePath(subimage5, subImage5Path)
              }
              alt=""
            />
          </div>

          {/* 주소와 지도 */}
          <p>
            주소: {addressKo} ({addressEn})
          </p>
          <div dangerouslySetInnerHTML={{ __html: mapUrl }}></div>

          {/* 설명 */}
          <h4>한국어 설명:</h4>
          <p>{linfoKo}</p>

          <h4>영어 설명:</h4>
          <p>{linfoEn}</p>
        </div>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
}
export default Landinfo;
