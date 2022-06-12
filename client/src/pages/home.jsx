import React, { useState, useEffect } from "react";
import Button from "../components/button";
import SearchGathering from "../components/search_gathering";
import Card from "../components/card_gathering";
import ModalViewGathering from "../modals/modalViewGathering";
import { format } from "date-fns";

import mockGatherings from "../mockData/mock_gather.json";
//! mockGatherings를 필터링된 모임정보로 대치한다.

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    searchTown: state.searchTown,
    searchDate: state.searchDate,
    searchTime: state.searchTime,
  };
};

//! date 형식 변경이 있을 수 있어 console.log 남겨놓겠습니다.

const Home = ({ searchTown, searchDate, searchTime }) => {
  const [gatherModalOpen, setGatherModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedGathering, setSelectedGathering] = useState(mockGatherings[0]);

  let filteredGatherings = mockGatherings;

  useEffect(() => {
    setSelectedGathering(mockGatherings[selectedIdx]);
  }, [selectedIdx]);

  useEffect(() => {
    // console.log(searchDate);
    // console.log(searchTime);
  }, [searchDate]);

  const filter = (gatherings, searchTown, searchDate, searchTime) => {
    if (searchTown.length > 0 && searchTown.length < 25) {
      gatherings = gatherings.filter(gathering =>
        searchTown.includes(gathering.town),
      );
    }

    if (searchDate !== "") {
      // console.log(searchDate);
      const convertedSearchDate = format(searchDate, "yyyy-MM-dd").toString();
      // console.log(convertedSearchDate);

      gatherings = gatherings.filter(gathering => {
        // console.log(gathering.date);
        // console.log(convertedSearchDate);
        // console.log(gathering.date === convertedSearchDate);
        return gathering.date === convertedSearchDate;
      });
    }

    if (searchTime.length === 1) {
      searchTime.forEach(filterTime => {
        if (filterTime === "오전") {
          gatherings = gatherings.filter(gathering => {
            // console.log(gathering.time.split(" ")[1]);
            return gathering.time.split(" ")[1] === "AM";
          });
        }
        if (filterTime === "오후") {
          gatherings = gatherings.filter(gathering => {
            return gathering.time.split(" ")[1] === "PM";
          });
        }
      });
    }
    return gatherings;
  };

  filteredGatherings = filter(
    mockGatherings,
    searchTown,
    searchDate,
    searchTime,
  );

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="h-6"></div>
      <SearchGathering className="flex flex-row items-center" />
      <Button className={"btn btn-green"} children={"모임 만들기"}></Button>
      <hr className="w-full border-[1px] border-grey-50" />
      <div className="grid grid-cols-4 gap-4">
        {filteredGatherings.map(gather => (
          <Card
            key={gather.id}
            props={gather}
            onClick={() => {
              setSelectedIdx(gather.id - 1);
              setGatherModalOpen(true);
            }}
          ></Card>
        ))}
      </div>
      <ModalViewGathering
        modalOpen={gatherModalOpen}
        closeModal={() => setGatherModalOpen(false)}
        selectedGathering={selectedGathering}
      />
    </div>
  );
};

export default connect(mapStateToProps)(Home);
