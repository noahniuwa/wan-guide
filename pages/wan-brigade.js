import Layout from "../components/layout"
import VideoGuide from "../components/videoGuide"
import { useEffect, useState } from "react"
import fetch from 'node-fetch'


const WanBrigade = () =>{
  const [data, setData] = useState({ ranks: 
    {
      generals: "Loading...", // > 10 million
      colonels: "Loading...", // 10 million to 1 million
      majors: "Loading...",   // 1 million to 500 thousand
      captains: "Loading...", // 500 thousand to 100 thousand
      lieutenants: "Loading...", // 100 thousand to 50 thousand
      sergeants: "Loading...", // 50 thousand to 10 thousand
      corporal: "Loading...", // 10 thousand to 5 thousand
      specialist: "Loading...", // 5 thousand to 1 thousand
      private: "Loading..." // 1 thousand to 500
    },
    updateTime: "Loading...",
  })
  const [rankInfo, setRankInfo] = useState("-------")
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    fetch("https://vast-stream-09242.herokuapp.com/", )
      .then(rawData => rawData.json())
      .then(json => {
        setData(json)
      })
      .catch(err => console.log(err))
  }, [])

  const buttonHandler = (event) => {
    setRankInfo("Loading...")
    fetch("https://vast-stream-09242.herokuapp.com/getrank", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({address: inputValue}) // body data type must match "Content-Type" header
    })
    .then(rawData => rawData.json())
    .then(json => {
      setRankInfo(json.message)
      setInputValue("")
    })
    .catch(err => console.log(err))  
  }
  const inputChangeHandler = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <Layout>
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="has-text-white title">
              Wan Brigade
            </h1>
            <h2 className="has-text-white subtitle">
              Wan Troops Unite!
            </h2>

            <div className="field has-addons has-addons-centered">
              <div className="control">
                <input onChange={inputChangeHandler} className="input" value={inputValue} type="text" placeholder="Public address" />
              </div>
              <div className="control">
                <a onClick={buttonHandler} className="button is-dark">
                  Search
                </a>
              </div>
            </div>
            <div className="results">
              {rankInfo}
            </div>
            <h2 className="has-text-white is-size-7 subtitle">
              Updated at: {data.updateTime}
            </h2>
            <div>
            <table>
              <tr>
                <th className="has-text-white">Rank</th>
                <th className="has-text-white">Comrades</th>
                <th className="has-text-white">WAN Held (Includes staked WAN)</th>
              </tr>
              <tr>
                <td>General</td>
                <td>{data.ranks.generals}</td>
                <td>> 10 million WAN</td>
              </tr>
              <tr>
                <td>Colonel</td>
                <td>{data.ranks.colonels}</td>
                <td>10 million to 1 million WAN</td>
              </tr>
              <tr>
                <td>Major</td>
                <td>{data.ranks.majors}</td>
                <td>1 million to 500 thousand WAN</td>
              </tr>
              <tr>
                <td>Captain</td>
                <td>{data.ranks.captains}</td>
                <td>500 thousand to 100 thousand WAN</td>
              </tr>
              <tr>
                <td>Lieutenant</td>
                <td>{data.ranks.lieutenants}</td>
                <td>100 thousand to 50 thousand WAN</td>
              </tr>
              <tr>
                <td>Sergeant</td>
                <td>{data.ranks.sergeants}</td>
                <td>50 thousand to 10 thousand WAN</td>
              </tr>
              <tr>
                <td>Corporal</td>
                <td>{data.ranks.corporal}</td>
                <td>10 thousand to 5 thousand WAN</td>
              </tr>
              <tr>
                <td>Specialist</td>
                <td>{data.ranks.specialist}</td>
                <td>5 thousand to 1 thousand WAN</td>
              </tr>
              <tr>
                <td>Private</td>
                <td>{data.ranks.private}</td>
                <td>1 thousand to 500 WAN</td>
              </tr>
            </table>
              
            </div>
          </div>
        </div>
      </section>
      <style jsx>
        {`
        .title {
          text-align: center;
          margin-bottom: 50px;
        }
    
        .results {
          margin: 20px auto;
          max-width: 800px;
        }
        th {
          font-size: 1.5rem;
        }
        table, th, td {
          border: 1px solid white;

        }
        th, td {
          padding: 7px;
        }
        table {
          margin: auto;
        }
        @media(max-width: 800px) {
          th, td {
            padding-left: 5px;
          }
          th {
            font-size: 1.1rem;
          }
          td {
            font-size: .8rem;
          }
        }
      `}
      </style>
    </Layout>
  )
}

export default WanBrigade