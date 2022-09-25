import { useLazyQuery, gql } from "@apollo/client";

const Fruit = (): JSX.Element => {
  const GET_FRUIT = gql`
    query GetFruit($fruitId: ID!) {
      Fruit(id: $fruitId) {
        id
        name
        color
      }
    }
  `;

  // getFruit에 전달된 옵션은 useLazyQuery에 전달된 옵션보다 우선순위를 갖는다.
  const [getFruit, { loading, error, data }] = useLazyQuery(GET_FRUIT, {
    variables: { fruitId: 1 },
    fetchPolicy: "cache-first", // "cache-first"가 기본 값
    nextFetchPolicy: "cache-first", // 쿼리가 향후 캐시를 업데이트했을 때 응답하는 방식을 결정하는 옵션,"cache-first"가 기본 값
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <div>error ㅠㅠ</div>;

  return (
    <div>
      {[1, 2, 3].map((btnIndex) => (
        <div key={btnIndex}>
          <button
            onClick={() => getFruit({ variables: { fruitId: btnIndex } })}
            style={{ marginBottom: "5px" }}
          >
            클릭 시 {btnIndex}번째 과일을 보여준다.
          </button>
        </div>
      ))}
      {data?.Fruit && <div>현재 과일의 이름은? : {data.Fruit.name}</div>}
      <hr />
    </div>
  );
};

export default Fruit;
