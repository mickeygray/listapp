import React, {
  Fragment,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import Navbar from "../../layout/Navbar";
import ProspectsSearch from "../../stacks/ProspectsSearch";
import Prospects from "../../stacks/Prospects";
import TodaysProspects from "../../stacks/TodaysProspects";
import StatContext from "../../../context/stat/statContext";
import LeadContext from "../../../context/lead/leadContext";
import FieldSelect from "../../stacks/FieldSelect";
import Pagination from "../../stacks/Pagination";

const Stacks = () => {
  const statContext = useContext(StatContext);
  const leadContext = useContext(LeadContext);

  const {
    filterPayments,
    clearFilter,
    filtered,
    searchPaymentDates,
  } = statContext;

  const { setFilters, prospectsRes } = leadContext;

  useEffect(() => {
    setProsp({
      listOriginators: false,
      listLoanProcessors: false,
      listDocumentProcessors: false,
      listUpsells: false,
      listFederalReso: false,
      listTaxPreparers: false,
      listStateReso: false,
      listStatus: false,
      hasRepresentation: false,
      hasFederalFile: false,
      hasStateFile: false,
      hasHardship: false,
      hasPaymentPlan: false,
      hasOffer: false,
      hasAppeal: false,
      hasCorp: false,
      hasAnnuity: false,
      showCreateDate: false,
      showName2: false,
      showAddress2: false,
      showCity2: false,
      showState2: false,
      showZip2: false,
      showEmployerTime: false,
      showSsn2: false,
      showLexId: false,
      showRelation: false,
      showPhone2: false,
      showPhone3: false,
      showBankruptcyType: false,
      showHomeLoan: false,
      showAge: false,
      showEmail2: false,
      showEmail3: false,
      showProblem1: false,
      showProblem2: false,
      showProblem3: false,
      showResSold: false,
      showResSold2: false,
      showHome: false,
      showHomePay: false,
      showWages: false,
      showIncome1Type: false,
      showIncome1Value: false,
      showIncome2Type: false,
      showIncome2Value: false,
      showIncome3Type: false,
      showIncome3Value: false,
      showOtherIncomeType: false,
      showOtherIncomeValue: false,
      showAvailableCredit: false,
      showTotalCredit: false,
      showEmployerName: false,
      showEmployerPhone: false,
      showFullName: true,
      showAmount: true,
      showPlaintiff: false,
      showPhone: true,
      isProspect: false,
      isClient: false,
      isUpsellable: false,
      isHighdollar: false,
      isRedLine: false,
      isRefunded: false,
      showPinCode: true,
      showStatus: true,
      showCompliant: false,
      showFilingStatus: false,
      showCpa: false,
      showCreditScore: false,
      showSsn: false,
      showGross: false,
      showQuote: false,
      showInitial: false,
      showTotal: false,
      showPayments: false,
      showPercent: false,
      showRedline: false,
      showRefund: false,
      showInitialPaymentDate: false,
      showLastPaymentDate: false,
      showBalance: false,
      showLoan: false,
    });

    setArray([]);
  }, []);

  const [prosp, setProsp] = useState({
    listOriginators: false,
    listLoanProcessors: false,
    listDocumentProcessors: false,
    listUpsells: false,
    listFederalReso: false,
    listTaxPreparers: false,
    listStateReso: false,
    listStatus: false,
    isProspect: false,
    isClient: false,
    isUpsellable: false,
    isHighdollar: false,
    isRedLine: false,
    isRefunded: false,
    hasRepresentation: false,
    hasFederalFile: false,
    hasStateFile: false,
    hasHardship: false,
    hasPaymentPlan: false,
    hasOffer: false,
    hasAppeal: false,
    hasCorp: false,
    hasAnnuity: false,
    showCreateDate: false,
    showName2: false,
    showAddress2: false,
    showCity2: false,
    showCreditScore: false,
    showState2: false,
    showZip2: false,
    showEmployerTime: false,
    showSsn2: false,
    showLexId: false,
    showRelation: false,
    showPhone2: false,
    showPhone3: false,
    showBankruptcyType: false,
    showHomeLoan: false,
    showAge: false,
    showEmail2: false,
    showEmail3: false,
    showProblem1: false,
    showProblem2: false,
    showProblem3: false,
    showResSold: false,
    showResSold2: false,
    showHome: false,
    showHomePay: false,
    showWages: false,
    showIncome1Type: false,
    showIncome1Value: false,
    showIncome2Type: false,
    showIncome2Value: false,
    showIncome3Type: false,
    showIncome3Value: false,
    showOtherIncomeType: false,
    showOtherIncomeValue: false,
    showAvailableCredit: false,
    showTotalCredit: false,
    showEmployerName: false,
    showEmployerPhone: false,
    showFullName: true,
    showAmount: true,
    showPlaintiff: false,
    showPhone: true,
    showPinCode: true,
    showStatus: true,
    showEmail: false,
    showCompliant: false,
    showFilingStatus: false,
    showCpa: false,
    showSsn: false,
    showGross: false,
    showQuote: false,
    showInitial: false,
    showTotal: false,
    showPayments: false,
    showPercent: false,
    showRedline: false,
    showRefund: false,
    showInitialPaymentDate: false,
    showLastPaymentDate: false,
    showBalance: false,
    showLoan: false,
  });

  const today = new Date(Date.now());

  let formattedToday = Intl.DateTimeFormat(
    "en-US",
    { timeZone: "America/Los_Angeles" },
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  ).format(today);

  const [searchState, setSearchState] = useState(true);
  const [array, setArray] = useState([]);
  const onChange2 = (e) => {
    setSearchState((prevState) => !prevState);
  };

  const onClick = (e) => {
    setFilters(array);
  };

  const toggleProsp = useCallback((e) => {
    setProsp({ ...prosp, [e.target.name]: e.target.checked });
    function filterByCount(array, count) {
      return array.filter(function (value) {
        return (
          array.filter(function (v) {
            return v === value;
          }).length === count
        );
      });
    }

    setArray(
      filterByCount(Object.keys(prosp), 1)
        .filter((k) => prosp[k])
        .filter((a) => !a.includes("list"))
        .filter((a) => !a.includes("show"))
    );
  });

  useEffect(() => {
    if (array.length > 0 && new Set(array).size !== array.length) {
      function filterByCount(array, count) {
        return array.filter(function (value) {
          return (
            array.filter(function (v) {
              return v === value;
            }).length === count
          );
        });
      }

      setArray(
        filterByCount(array, 1)
          .filter((a) => !a.includes("list"))
          .filter((a) => !a.includes("show"))
      );

      setFilters(array);
    }
  }, [array]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = prospectsRes.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onChange = (e) => {
    setPostsPerPage(e.target.value);
  };
  return (
    <Fragment>
      <Fragment>
        <Navbar />
      </Fragment>
      <select
        name='searchState'
        id='searchState'
        value={searchState}
        onChange={onChange2}>
        <option
          value='true'
          checked={searchState === true}
          onChange={onChange2}>
          Search Prospects / Clients
        </option>
        <option
          onChange={onChange2}
          value='false'
          checked={searchState === false}>
          View Todays Prospects / Clients
        </option>
      </select>
      <div className='grid-2b'>
        <div>
          <h3>Post Per Page</h3>
          <select name='postsPerPage' onChange={onChange}>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='25'>50</option>
            <option value='25'>100</option>
          </select>
          <FieldSelect prosp={prosp} toggleProsp={toggleProsp} />
        </div>
        {searchState ? (
          <div className='card'>
            <h3 className='text-danger'>Stacks!</h3>
            <ProspectsSearch />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={prospectsRes.length}
              paginate={paginate}
            />
            <Prospects prosp={prosp} currentPosts={currentPosts} />
          </div>
        ) : (
          <div className='card' style={{ height: "100%" }}>
            <h3 className='text-danger'>Racks! - {formattedToday}</h3>

            <TodaysProspects />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Stacks;
