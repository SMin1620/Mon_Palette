import React, { useState, useEffect, useRef, useMemo } from "react";
import { createRoot } from 'react-dom';
import { UAParser } from "ua-parser-js";
import styles from "./SelectBox.module.css"


// dummy data
const optionData = [
    { optionKey: "key01", optionName: "my option 1" },
    { optionKey: "key02", optionName: "my option 2" }
  ];

const moWidth = 575;

//custom hook
const useDevice = () => {
    // 모바일 디바이스인지 아닌지 체크
    // uaParser 패키지 이용
    const uaParser = new
    UAParser(window.navigator.userAgent);
        return useMemo(() => {
            try {
                return uaParser.getDevice();
            } catch (err) {
                return null;
            }
        }, []);
};

const useResize = () => {
    // 브라우저 가로 너비 감지
    const [state, setState] = useState({
        w: window?.innerWidth,
        h: window?.innerHeight
    });

    const debounce = (func, delay) => {
        let timeoutId = null;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => 
            func(...args), delay);
        };
    };

    const onResize = (e) => {
        setState(() => {
            return {
                w: e.target.innerWidth,
                h: e.target.innerHeight
            };
        });
    };

    useEffect(() => {
        window.addEventListener("resize", debounce(onResize, 100));
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);
    return state;
}



function SelectBox () {
    const [isExpand, setIsExpand] = useState(false);
    const [selected, setSelected] = useState("key01");

    // custom hook
    const { type: deviceType } = useDevice();
    const { w: deviceWidth } = useResize();

    const handleKeydown = (e) => {
        // 키보드 제어
        // KeyCode
        // 38: 화살표 위 | 40: 화살표 아래 | 13: 엔터
        if (e.KeyCode === 38 || e.KeyCode === 40 || e.KeyCode === 13) {
            e.preventDefault(); // 기본동작을 막아 options 비노출
        }

        if (e.KeyCode === 38 || e.KeyCode === 40) {
            // 위, 아래 키 눌렀을 때 선택한 데이터 변경
            setIsExpand(() => true);
            setSelected((prev) => {
                const newIdx = () => {
                    // 이전, 다음 아이템의 인덱스 번호 가져와 값 변경
                    const oldIdx = optionData.findIndex(
                        (option) => option.optionKey === prev
                    );
                    if (e.KeyCode === 38) {
                        return oldIdx === 0 ? oldIdx : oldIdx -1;
                    }
                    if (e.KeyCode === 40) {
                        return oldIdx === optionData.length - 1 ? oldIdx :oldIdx + 1;
                    }
                };
                return optionData[newIdx()].optionKey;
            })
        }
        if (e.KeyCode === 13) {
            // 엔터 키 눌렀을 때 ul 리스트 토글
            setIsExpand((prev) => !prev);
        }
    };

    const handleMouseDown = (e) => {
        // select 태그를 누르는 순간 option 리스트가 노출되므로
        // 마우스를 뗄 때 실행되는 onClick이 아닌
        // onMouseDown일 때 기본 동작을 막아야 함
        e.preventDefault();

        // select 리스트가 열려 있는 상태에서 다시 누른 상황이라면
        // focus 되어 있는지 체크하고
        // focus되어 있는 상태라면 blur 처리
        if (e.target.matches(":focus")) {
            setIsExpand((prev) => !prev);
        } else {
            e.target.focus();
            setIsExpand(() => true);
        }
        return false;
    };

    return (
        <div
        className={StyleSheet.wrapper}
        onBlur={() => {
            // onBlur일 때 하단 드롭다운 메뉴를 닫는다
            // select 태그가 아니라 ul 리스트도 함께 감싼 wrapper에 
            // onBlur를 넣어줘야 ul 태그의 버튼 이벤트를 onClick에 넣을 수 있다
            setIsExpand(() => false);
        }}
        onKeyDown={(e) => {
            if (deviceWidth > moWidth || deviceType !== "mobile")
            handleKeydown(e);
        }}
        onMouseDown={(e) => {
            if (deviceWidth > moWidth || deviceType !== "mobile") handleMouseDown(e);
        }}
        >
            <div>
                <span className={`${styles.arrow} ${isExpand ? styles["is-expanded"] : ""}`}></span>
                    <select
                        name="select"
                        value={selected}
                        onChange={(e) => {
                            // option을 선택하면 selected 값을 변경
                            setSelected(e.target.value);
                        }}
                    >
                        {optionData.length > 0 &&
                        optionData.map(({ optionKey, optionName}) => {
                            // optionData를 이용해 옵션 렌더링
                            return ( 
                                <option key={optionKey} value={optionKey}>
                                    {optionName}
                                </option>
                            );
                        })}
                    </select>
            </div>
            { 
                isExpand && (
                    <ul>
                        {optionData.length > 0 &&
                            optionData.map(({ optionKey, optionName }) => {
                                // optionData를 이용해 ul 리스트 렌더링
                                return (
                                    <li key={optionKey}>
                                        <button
                                            buttonid={optionKey}
                                            type="button"
                                            onClick={() => {
                                                // select option을 선택하면 onchange를 이용해 state값
                                                // selected state를 바로 변경함
                                                setSelected(optionKey);
                                                setIsExpand(false);
                                            }}
                                            className={`${selected === optionKey ? styles.selected : ""}`}
                                            >
                                                {optionName}
                                            </button>
                                    </li>
                                )
                            })}
                    </ul>
                )}
        </div>
    )

}

export default SelectBox;