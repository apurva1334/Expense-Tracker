const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types}=require("mongoose");

// dashboard data
exports.getDashboardData = async(req,res)=>
{
    try{
        const userId= req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // fetch Total income and Expense 

        const totalIncome = await Income.aggregate([
            {$match: { userId: userObjectId}},
            {$group:{_id:null,total:{sum:"$amount"}}},

        ]);
        console.log("totalIncome",{totalIncome,userId: isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null,total:{sum:"$amount"}}},

        ]);
        

        // get income transaction in last 60 days 

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date:{$gte:new Date(Date.now()-60*24*60*60*1000)}, 
        }).sort({date:-1});


        //get total income for last 60 days

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum,transaction)=>sum + transaction.amount,
            0
        );

        // get expense transactions in last 30 days 

         
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date:{$gte:new Date(Date.now()-30*24*60*60*1000)}, 
        }).sort({date:-1});

        //get total Expense for last 30 days

        const expensesLast60Days = last30DaysExpenseTransactions.reduce(
            (sum,transaction)=>sum + transaction.amount,
            0
        );
    }
};