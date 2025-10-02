import type React from "react";

import styles from "./PageSelector.module.scss"
import ArrowDownIcon from "../icons/ArrowDownIcon";
import classNames from "classnames";

type PageSelectorParams = {
    page: number,
    cntOfPages: number,
    onChange: (page: number) => void,
};

type PageButtonParams = {
    page: number,
    active?: boolean,
    onClick: (page: number) => void,
};

const PageButton: React.FC<PageButtonParams> = ({ page, onClick, active = false }) => {
    return (
        <button onClick={() => onClick(page)} className={classNames(styles.page_button, { [styles.active]: active })}>
            {page}
        </button>
    );
};

const PageSelector: React.FC<PageSelectorParams> = ({ page, cntOfPages, onChange }) => {
    const changePageHandler = (newVal: number) => {
        if (newVal > 0 && newVal <= cntOfPages) {
            onChange(newVal);
        }
    }

    const midPage= Math.max(3, Math.min(cntOfPages - 2, page));

    return (
        <div className={styles.page_selector}>
            <button className={styles.arrow} disabled={page === 1} onClick={() => changePageHandler(page - 1)}>
                <ArrowDownIcon color={page === 1 ? "secondary" : "primary"} angle={90} />
            </button>

            <div className={styles.pages}>
                {
                    (cntOfPages > 5) ?
                        <>
                            <PageButton page={1} active={page === 1} onClick={changePageHandler} />

                            {
                                midPage=== 3 ?
                                    <PageButton page={2} active={page === 2} onClick={changePageHandler} />
                                    :
                                    <div className={styles.ellipses}>...</div>
                            }

                            <PageButton page={midPage} active={page === midPage} onClick={changePageHandler} />

                            {
                                midPage=== cntOfPages - 2 ?
                                    <PageButton page={cntOfPages - 1} active={page === cntOfPages - 1} onClick={changePageHandler} />
                                    :
                                    <div className={styles.ellipses}>...</div>

                            }

                            <PageButton page={cntOfPages} active={page === cntOfPages} onClick={changePageHandler} />
                        </>
                        :
                        Array(cntOfPages).fill(0).map((_, i) => {
                            return <PageButton page={i+1} active={page === i+1} key={i} onClick={changePageHandler} />;
                        })
                }
            </div>

            <button className={styles.arrow} disabled={page === cntOfPages} onClick={() => changePageHandler(page + 1)}>
                <ArrowDownIcon color={page === cntOfPages ? "secondary" : "primary"} angle={-90} />
            </button>
        </div>
    );
};

export default PageSelector;