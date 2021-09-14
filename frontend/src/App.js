import { useState } from "react";
import axios from "axios";
import TableContent from "./TableContent";

function App() {
  const [data,setData] = useState({});
  const [response,setResponse] = useState();
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/randomWebsite",data).then(res => {
        console.log(res);
        setResponse(res.data.resp);
    }).catch(err => console.log(err))
  }
  return (
      <>
        <div className="m-auto mt-5 justify-content p-auto">        
            <h1>Link Scrapping</h1>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                      <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-full-name"
                      >
                          Website url
                      </label>
                  </div>
                  <div className="md:w-2/3">
                      <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"                          
                          onChange={handleChange}
                          name="url"
                      />
                  </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                      <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-password"
                      >
                          selector field
                      </label>
                  </div>
                  <div className="md:w-2/3">
                      <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-password"
                          type="text"
                          placeholder="add only selector field"
                          onChange={handleChange}
                          name="tag"
                      />
                  </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3" />
                  <label className="md:w-2/3 block text-gray-500 font-bold">             
                      <span className="text-sm">Enter the selector for above field!</span>
                  </label>
              </div>
              <div className="md:flex md:items-center">
                  <div className="md:w-1/3" />
                  <div className="md:w-2/3">
                      <button
                          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          type="submit"
                      >
                        Hit the scrapper
                      </button>
                  </div>
              </div>
          </form>
          </div>

          <TableContent response={response} />
      </>
  );
}

export default App;
