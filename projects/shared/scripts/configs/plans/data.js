var plans = {
    FREE: "free",
    BASIC: "starter",
    PRO: "pro",
    PRO_PLUS: "pro-plus",
    PREMIUM: "premium",
    INDIVIDUAL: "individual",
    CANCEL: 100,
};


var icons = {};
icons[plans.BASIC] = "vp_plan_icon_basic";
icons[plans.PRO] = "vp_plan_icon_pro";
icons[plans.PRO_PLUS] = "vp_plan_icon_pro_plus";
icons[plans.PREMIUM] = "vp_plan_icon_premium";
icons[plans.INDIVIDUAL] = "vp_plan_icon_individual";
icons[plans.CANCEL] = "vp_plan_icon_cancel";


var tooltips = {};
tooltips[plans.FREE] = "You are on the free plan.";
tooltips[plans.BASIC] = "You are on Basic plan.";
tooltips[plans.PRO] = "You are on Pro plan.";
tooltips[plans.PRO_PLUS] = "You are on Pro Plus plan.";
tooltips[plans.PREMIUM] = "You are on Premium plan.";


module.exports = {
    plans: plans,
    icons: icons,
    tooltips: tooltips
};