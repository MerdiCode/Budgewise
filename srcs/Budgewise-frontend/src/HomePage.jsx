import Expenses from "./Charts/ExpensesChart"
import ProfitChart from "./Charts/ProfitChart.jsx"
import DolarSign from "./assets/Dolar.png"
import Logo from './assets/MoneyTackerLogo.png'
import { useEffect, useState } from "react"
import axios from "axios"
import ProfVsExp from "./Charts/ProfitVsExpensesChart.jsx"
import { UsersAuth } from "./authenication/UserAuth.jsx"
import { createContext, useContext } from "react"

export const values = createContext(null);

function HomePage() {

    let [AddProfit, SetAddProfit] = useState(false)
    let [AddExpenses, SetAddExpenses] = useState(false)
    let [AddGoal, SetAddGoal] = useState(false)
    let [goalAomunt, setGoalEmount] = useState();
    let [goalD, setGoalD] = useState()
    let [balance, setBalance] = useState();
    let [Eamount, setEmount] = useState();
    let [Etype, setEtype] = useState();
    let [DisExpenses, setDisExpenses] = useState([]);
    let [profitData, setProfitData] = useState();
    let [DProfit, setDProfit] = useState([]);
    let [profExpE, setProfVsExpE] = useState(0);
    let [profExpP, setProfVsExpP] = useState(0);
    let [percentageGoal, setPercentageGoal] = useState();
   let [goalMsg,setGoalMsg] = useState();
    const { user } = useContext(UsersAuth)


    useEffect(() => {
        if (balance && goalD) {
            let x = (balance / goalD) * 100;
             if(x<0){
                setPercentageGoal(0)
             }else if(x>100){
                setPercentageGoal(100)
                setGoalMsg('Goal completed')
            }else{
                setPercentageGoal(x.toFixed(2))
                setGoalMsg(`Road to ${goalD}€`) 
            }

          
        }
    }, [balance, goalD])



    useEffect(() => {
        const getGoal = async () => {
            try {
                const goal = await axios.get("https://uttermost-tabby-anatosaurus.glitch.me/users/getGoal/", { withCredentials: true });

                setGoalEmount(goal.data.Goal)
                setGoalD(goal.data.Goal)

            } catch (error) {
                if (error) {
                    console.error(error)
                }
            }
        }
        getGoal()
    }, [])
    useEffect(() => {
        const updateBalance = async () => {
            try {
                await axios.post('https://uttermost-tabby-anatosaurus.glitch.me/users/postBalance/', { balance }, { withCredentials: true })
            } catch (error) {
                if (error) {
                    console.error(error)
                }
            }
        }
        updateBalance()
    }, [balance])

    useEffect(() => {
        const ProfExp = async () => {

            try {
                const AddProfVsExp = await axios.get("https://uttermost-tabby-anatosaurus.glitch.me/users/getProfVsExp/", { withCredentials: true });

                setProfVsExpE(Number(AddProfVsExp.data.expenses))
                setProfVsExpP(Number(AddProfVsExp.data.profit))
            } catch (error) {
                if (error) {
                    console.error(error)
                }
            }
        }
        ProfExp()
    }, [])


    const DeleteExpensesList = async (ExpensesID) => {
        try {
            await axios.post('https://uttermost-tabby-anatosaurus.glitch.me/users/delExpenses/', { ExpensesID }, { withCredentials: true })
            getExpenses();
        } catch (error) {
            console.error(error)
        }
    }
    const DeleteProfitList = async (ProfitID) => {
        try {
            await axios.post('https://uttermost-tabby-anatosaurus.glitch.me/users/delProfit/', { ProfitID }, { withCredentials: true })
            getProfit();
        } catch (error) {
            console.error(error)
        }
    }

    const updateProfVsExp = async (profit, expenses) => {

        console.log(profit, expenses)
        setProfVsExpE(expenses)
        setProfVsExpP(profit)
        try {
            await axios.post("https://uttermost-tabby-anatosaurus.glitch.me/users/profExp/", { profExpE, profExpP }, { withCredentials: true });
        } catch (err) {
            console.error(err)
        }
    }
    const CreateGoal = async (amount) => {
        setGoalD(amount)
        try {
            await axios.post('https://uttermost-tabby-anatosaurus.glitch.me/users/updateGoal/', { amount }, { withCredentials: true })
        } catch (error) {
            if (error) {
                console.error(error)
            }
        }
    }

    const postProfit = async () => {
        if (profitData) {
            setBalance(balance += profitData)
            updateProfVsExp(profExpP += profitData, profExpE)
        }

        try {
            await axios.post('https://uttermost-tabby-anatosaurus.glitch.me/users/Profit/', { profitData }, { withCredentials: true })

            getProfit();
        } catch (error) {
            console.error(error)
        }
    }



    const expenses = async () => {
        if (Eamount) {
            setBalance(balance -= Eamount)
            updateProfVsExp(profExpP, profExpE += Eamount)
        }
        try {
            console.log('exp')
            await axios.post('https://uttermost-tabby-anatosaurus.glitch.me/users/expenses/', { Eamount, Etype }, { withCredentials: true })
            getExpenses();


        } catch (error) {
            console.error(error)
        }

    }



    const getExpenses = async () => {
        try {
            await axios.get('https://uttermost-tabby-anatosaurus.glitch.me/users/getExpenses/', { withCredentials: true })
                .then(result => { setDisExpenses(result.data) })

        } catch (error) {
            console.error(error)
        }
    }


    const getProfit = () => {
        try {
            axios.get('https://uttermost-tabby-anatosaurus.glitch.me/users/getProfit/', { withCredentials: true })
                .then(result => { setDProfit(result.data) })
        } catch (error) {
            console.error(error)
        }
    }

    const BalancDispaly = async () => {
        try {
            await axios.get('https://uttermost-tabby-anatosaurus.glitch.me/users/getBalance/', { withCredentials: true })
                .then(result => setBalance(Number(result.data.Balance)))
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getExpenses()
        getProfit()
        BalancDispaly();
    }, [])


    const LogOut = async () => {
        try {
            await axios.post('https://uttermost-tabby-anatosaurus.glitch.me/users/Logout/', {}, { withCredentials: true })
        } catch (error) {
            console.error(error)
        }
    }

    const imgs = () => {
        return (<>
            <img className="imgs" style={{ position: "absolute", left: '-50px', top: "-200px", rotate: '50deg', width: '600px', height: '600px' }} src={DolarSign} alt="" />
            <img className="imgs" style={{ position: "absolute", left: '1600px', top: "250px", rotate: '150deg', width: '600px', height: '600px' }} src={DolarSign} alt="" />
            <img className="imgs" style={{ position: "absolute", left: '700px', top: "-5px", rotate: '150deg', width: '900px', height: '900px' }} src={DolarSign} alt="" />
            <img className="imgs" style={{ position: "absolute", left: '100px', top: "600px", rotate: '50deg', width: '800px', height: '800px' }} src={DolarSign} alt="" />
            <img className="imgs" style={{ position: "absolute", left: '1400px', top: "900px", rotate: '150deg', width: '700px', height: '700px' }} src={DolarSign} alt="" />
        </>)

    }

    const loadingBar = () => {
        return (<>
            <div className="loadingBarHeader shadow">


                <div className={goalD ? "d-block" : "d-none"}>


                    <h2 style={{ color: '#4A628A', textAlign: 'left' }}>Goal</h2>

                    <div className="d-flex">
                        <div className="OuterLoadBorder ">
                            <div className="InnerLoadBorder d-flex align-items-center  justify-content-end p-1"
                                style={{ width: `${percentageGoal}%`}}></div>
                        </div>
                        <button onClick={async () => { setGoalEmount(null), CreateGoal(null) }} className="addGoal ms-2">X</button>
                    </div>
                    <div className="d-flex">
                        <p style={{ color: '#4A628A', fontWeight: '600', fontSize: '0.9rem' }} className="m-0 ms-1 flex-grow-1">{`${percentageGoal}%`}</p>
                        <p style={{ marginRight: '60px', color: '#4A628A', fontWeight: '600', fontSize: '0.9rem' }}>{goalMsg}</p>
                    </div>

                </div>



                <div className={!goalD ? "d-block" : "d-none"}>
                    <div className="d-flex popup" style={{ width: '300px' }}>

                        <div style={AddGoal == true ? { display: 'block', position: 'absolute', top: '-140px', left: '-20px' } : { display: 'none' }}>
                            <div style={{ height: '130px', borderRadius: '10px' }}
                                className=" PopupDesign p-2 d-flex flex-column justify-content-center align-items-center gap-1">

                                <button onClick={() => { SetAddGoal(false) }} style={{ backgroundColor: '#B9E5E8', color: '#4A628A', padding: '0', fontWeight: '700 ' }}
                                    className="addGoal p-1 ps-2 pe-2 align-self-end">X</button>
                                <input onChange={(e) => setGoalEmount(e.target.value)} style={{ width: '150px' }} className="form__inset mt-33 p-1" type='number' placeholder="Amount" />
                                <button onClick={() => CreateGoal(goalAomunt)} style={{ backgroundColor: '#B9E5E8', color: '#4A628A' }} className="addGoal mt-2">Add </button>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => { SetAddGoal(true), SetAddExpenses(false), SetAddProfit(false) }} className="mb-3 addGoal shadow">Add A Financial Goal</button>
                    <div className="OuterLoadBorder shadow">
                        <div className="InnerLoadBorder"></div>
                    </div>
                </div>
            </div>
        </>)
    }

    const ShowBalanc = () => {


        return (
            <>
                <div style={{ position: 'relative' }} className=" d-lg-none d-md-none ShowBalanc  p-3 ps-5">
                    <img className="imgs" src={DolarSign} alt="" width={'400px'} height={'400px'} />
                    <div className="d-flex justify-content-between">
                        <img src={Logo} alt="" width={'160px'} height={'30px'} />
                        <button onClick={async () => { await LogOut(), history.go(0) }} style={{ color: 'white', position: 'relative' }} className="addGoal me-3">Log out</button>
                    </div>
                    <p className="mb-0 mt-3">Welcome back</p>
                    <h1>{user.User.UserName}</h1>
                    <h2 className="text-start mb-0 mt-3" style={{ fontSize: '1.2rem' }}>Current Balance</h2>
                    <div className="d-flex">
                        <h1 className="mb-3 " style={{ fontSize: '3rem', color: '#4A628A', borderRadius: '4px' }}>{balance}</h1>
                        <div className="ms-3 mt-4 addGoal p-2 d-flex align-items-center" name="" id="" style={{ position: 'relative', height: '30px', padding: "0px" }}>
                            EUR
                        </div></div>
                    <div>
                        <div className="d-flex popup" style={{ width: '300px' }}>
                            <div style={AddProfit == true ? { display: 'block', position: 'absolute', top: '90px', left: '25px' } : { display: 'none' }}>
                                <div style={{width:'170px', height: '130px', borderRadius: '10px' }}
                                    className=" PopupDesign p-2 d-flex flex-column justify-content-center align-items-center gap-1">

                                    <button onClick={() => { SetAddProfit(false) }} style={{ backgroundColor: '#B9E5E8', color: '#4A628A', padding: '0', fontWeight: '700 ' }}
                                        className="addGoal p-1 ps-2 pe-2 align-self-end">X</button>
                                    <input onChange={(e) => { setProfitData(Number(e.target.value)) }} style={{ width: '150px' }} className="form__inset mt-33 p-1" type='number' value={Eamount} placeholder="Profit" />
                                    <button onClick={() => { postProfit() }} style={{ backgroundColor: '#B9E5E8', color: '#4A628A' }} className="addGoal mt-2">Add </button>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex popup" style={{ width: '300px' }}>
                            <div style={AddExpenses == true ? { display: 'block', position: 'absolute', top: '50px', left: '125px' } : { display: 'none' }}>
                                <div style={{ borderRadius: '10px' }} className=" PopupDesign p-2 d-flex flex-column justify-content-center align-items-center gap-1">
                                    <button onClick={() => SetAddExpenses(false)} style={{ backgroundColor: '#B9E5E8', color: '#4A628A', padding: '0', fontWeight: '700 ' }}
                                        className="addGoal p-1 ps-2 pe-2 align-self-end">X</button>
                                    <input onChange={(e) => { setEmount(Number(e.target.value)) }} style={{ width: '150px' }} className="form__inset mt-33 p-1" type='number' placeholder="Amount" />
                                    <input onChange={(e) => { setEtype(e.target.value) }} style={{ width: '150px' }} className="form__inset mt-2 p-1" type='text' placeholder="Type" />

                                    <button onClick={() => { expenses() }} style={{ backgroundColor: '#B9E5E8', color: '#4A628A' }} className="addGoal mt-2">Add </button>
                                </div>
                            </div>
                        </div>
                        <button style={{ position: 'relative' }} onClick={() => { SetAddProfit(true), SetAddExpenses(false), SetAddGoal(false) }} className="AddProfitButton me-3">+ Add profit</button>
                        <button style={{ position: 'relative' }} onClick={() => { SetAddExpenses(true), SetAddProfit(false), SetAddGoal(false) }} className="AddProfitButton">Add Expenses</button>
                    </div>
                </div>



                <div className=" container d-none gap-5 d-lg-flex d-md-flex flex-row align-items-center  mb-5" style={{ position: 'relative', width: '100%', marginTop: '140px', padding: '0px 30px' }}>
                    <div className="ShowBalanc d-flex gap-5 me-auto  align-items-center justify-content-left"
                        style={{ padding: '0px 30px', borderRadius: '10px', height: '300px' }}>
                        <div className="">
                            <img className="imgs d-none d-lg-block" src={DolarSign} alt="" width={'400px'} height={'400px'} />
                            <p className="mb-0 mt-3">Welcome back</p>
                            <h1>{user.User.UserName}</h1>
                            <h2 className="text-start mb-0 mt-3" style={{ fontSize: '1.2rem' }}>Current Balance</h2>
                            <div className="d-flex mb-4">
                                <h1 className="mb-3 " style={{ fontSize: '3rem', color: '#4A628A', borderRadius: '4px' }}>{balance}</h1>
                                <div className="ms-3 mt-4 addGoal p-2 d-flex align-items-center" name="" id="" style={{ position: 'relative', height: '30px', padding: "0px" }}>
                                    EUR
                                </div></div>

                            <div className="d-flex popup" style={{ width: '300px' }}>
                                <div style={AddProfit == true ? { display: 'block', position: 'absolute', top: '80px', left: '7px' } : { display: 'none' }}>
                                    <div style={{width:'170px', height: '130px', borderRadius: '10px' }}
                                        className=" PopupDesign p-2 d-flex flex-column justify-content-center align-items-center gap-1">

                                        <button onClick={() => { SetAddProfit(false) }} style={{ backgroundColor: '#B9E5E8', color: '#4A628A', padding: '0', fontWeight: '700 ' }}
                                            className="addGoal p-1 ps-2 pe-2 align-self-end">X</button>
                                        <input onChange={(e) => { setProfitData(Number(e.target.value)) }} className="form__inset mt-33 p-1" type='number' placeholder="Profit" />
                                        <button onClick={() => { postProfit() }} style={{ backgroundColor: '#B9E5E8', color: '#4A628A' }} className="addGoal mt-2">Add </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex popup" style={{ width: '300px' }}>
                                <div style={AddExpenses == true ? { display: 'block', position: 'absolute', top: '40px', left: '105px' } : { display: 'none' }}>
                                    <div style={{ borderRadius: '10px' }} className=" PopupDesign p-2 d-flex flex-column justify-content-center align-items-center gap-1">
                                        <button onClick={() => SetAddExpenses(false)} style={{ backgroundColor: '#B9E5E8', color: '#4A628A', padding: '0', fontWeight: '700 ' }}
                                            className="addGoal p-1 ps-2 pe-2 align-self-end">X</button>
                                        <input onChange={(e) => { setEmount(Number(e.target.value)) }} style={{ width: '150px' }} className="form__inset mt-33 p-1" type='number' placeholder="Amount" />
                                        <input onChange={(e) => { setEtype(e.target.value) }} style={{ width: '150px' }} className="form__inset mt-2 p-1" type='text' placeholder="Type" />

                                        <button onClick={() => { expenses() }} style={{ backgroundColor: '#B9E5E8', color: '#4A628A' }} className="addGoal mt-2">Add </button>
                                    </div>
                                </div>
                            </div>
                            <button style={{ position: 'relative' }} onClick={() => { SetAddProfit(true), SetAddExpenses(false), SetAddGoal(false) }} className="AddProfitButton me-3">+ Add profit</button>
                            <button style={{ position: 'relative' }} onClick={() => { SetAddExpenses(true), SetAddProfit(false), SetAddGoal(false) }} className="AddProfitButton">Add Expenses</button>


                        </div>
                        <div className="d-block d-lg-none">
                            {<ProfVsExp series={[profExpP, profExpE]} />}
                        </div>


                    </div>
                    <div className="shadow proVsExp d-none d-lg-flex align-items-center justify-content-center p-3">

                        {<ProfVsExp series={[profExpP, profExpE]} />}

                    </div>
                </div>
            </>)
    }



    const DailyLists = () => {

        return (<>
            <div className="mt-4" style={{ position: 'relative' }}>

            </div>
            <div className="d-flex gap-5 flex-column flex-sm-row ">

                <div style={{ width: '100%' }}>
                    <h2 className="text-start">Expenses List</h2>
                    <div className="tablecontainer text-center shadow">

                        <ul className="responsive-table p-0">
                            <li className="table-header gap-3">
                                <div className=" col-1">Amount</div>
                                <div className=" col-1">Type</div>
                            </li>
                            <div className="addScrollBar">

                                {DisExpenses.slice().reverse().map((value, i) => (<li key={i++} className="table-row">
                                    <div style={{ color: "#CC2B52" }} className="col col-1">{`-${value.amount} €`}</div>
                                    <div className=" col-2" data-label="Customer Name">{value.type}</div>
                                    <div className=" col-3"><button onClick={async () => { setBalance(balance += Number(value.amount)), await updateProfVsExp(profExpP, profExpE -= Number(value.amount)), DeleteExpensesList(value.id) }} className="addGoal">X</button></div>
                                </li>))}
                            </div>
                        </ul>
                    </div>
                </div>

                <div className="porfitDisHeader" style={{ width: '100%' }}>
                    <h2 className="text-start">Profit List</h2>
                    <div className="tablecontainer text-end shadow ">
                        <ul className="responsive-table p-0 ">
                            <li style={{ width: '70%' }} className="table-header">
                                <div className=" col-1 ">Profit</div>
                            </li>
                            <div className="addScrollBar">
                                {
                                    DProfit.slice().reverse().map((value, i) => (<li key={i} className="table-row">
                                        <div style={{ color: "#33e863" }} className="col col-1">{`+${value.Data} €`}</div>
                                        <div className=" col-3 me-2"><button onClick={async () => { setBalance(balance -= Number(value.Data)), await updateProfVsExp(profExpP -= Number(value.Data), profExpE), DeleteProfitList(value.Id) }} className="addGoal">X</button></div>

                                    </li>
                                    ))
                                }
                            </div>
                        </ul>

                    </div>
                </div>



            </div> </>)
    }

    const ChartDisplay = () => {
        return (<>
            <div style={{ position: "relative" }}>

                <div className="mt-4"><h1>Analytics</h1></div>

                <div className="ChartHeader pt-4 shadow d-lg-flex justify-content-center gap-3">
                    <div className="DisplayChart mb-4 d-lg-none d-md-none" style={{ height: '100%', }}>
                        {<ProfVsExp series={[profExpP, profExpE]} />}
                    </div>
                    <div className="DisplayChart mb-4">


                        {<Expenses />}
                    </div>
                    <div className="DisplayChart">

                        {<ProfitChart />}
                    </div>
                </div>

            </div>
        </>)
    }


    return (<>

        <div className=" m-auto" style={{ position: "relative", width: '100%', overflow: 'hidden', objectFit: 'cover' }}>
            {imgs()}
            {ShowBalanc()}
            <div className="container-md   HeaderBody" style={{ margin: '0 auto', position: "relative", padding: '0px 30px' }}>
                <div className="Header shadow d-none d-md-flex d-lg-flex  justify-content-between align-items-center">
                    <img style={{ margin: 'auto auto' }} src={Logo} className="mt-4 ms-3" alt="" width={'160px'} height={'30px'} />
                    <button onClick={async () => { await LogOut(), history.go(0) }} style={{ color: 'white', position: 'relative' }} className="addGoal me-5">Log out</button></div>
                {loadingBar()}
                {DailyLists()}
                {ChartDisplay()}

            </div>
        </div>
    </>)

}


export default HomePage;