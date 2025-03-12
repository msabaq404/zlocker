import * as React from "react";

interface FavProps {
  onFavChange: (fav: string[]) => void;
}

const Fav = (props: FavProps) => {

    const [fav, setFav] = React.useState(["", ""]);
    
    React.useEffect(()=>{
        props.onFavChange(fav);
    }, [fav]);

    
    
  return (
    <div>
      <div>
        <h1>Your Fav Letter 😉</h1>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
          return (
            <div
            key={letter}
              onClick={(e) => {
                for (const el of e.currentTarget.parentElement!.children) {
                  el.classList.remove("active");
                }
                e.currentTarget.classList.add("active");
                const to_set = e.currentTarget.innerText;
                setFav(f => [to_set, f[1]]);
              }}
              className="pellets"
            >
              {letter}
            </div>
          );
        })}
      </div>

      <div>
        <h1>Your Fav Number 😉</h1>
        {"1234567890".split("").map((letter) => {
          return (
            <div
            key={letter}
              onClick={(e) => {
                for (const el of e.currentTarget.parentElement!.children) {
                  el.classList.remove("active");
                }
                e.currentTarget.classList.add("active");
                const to_set = e.currentTarget.innerText;
                setFav(f => [f[0], to_set]);
              }}
              className="pellets"
            >
              {letter}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .pellets {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          font-family: "Courier New", Courier, monospace;

          margin: 2px;
          border-radius: 50%;
          background-color: aliceblue;
          color: rebeccapurple;
          border: 1px solid rebeccapurple;
          font-size: 1.5rem;
          width: 2rem;
          height: 2rem;
          cursor: pointer;
          transition: 0.3s ease;
        }

        div:has(> .pellets) {
          margin: 1rem auto;
          padding: 0.5rem 1rem;
          background-color: #f5f5f5;
          border-radius: 0.5rem;
          max-width: 25em;
          border-top: 5px solid rebeccapurple;
        }

        div:has(> .pellets) h1 {
          font-family: "Courier New", Courier, monospace;
          font-size: 1.5rem;
          color: black;
          text-align: center;
        }

        .pellets:hover, .pellets.active {
          background-color: rebeccapurple;
          color: aliceblue;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default Fav;
