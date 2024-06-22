export default function List({ children , style }) {
  
  return (
    <>
      <ul className="list-none list-inside" style={style}>
        {children}
      </ul>
    </>
  );
}
