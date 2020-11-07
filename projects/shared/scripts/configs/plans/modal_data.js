var PlanData = require('shared/configs/plans/data');


var plans = PlanData.plans,
    icons = PlanData.icons;


var selectPlanGreeting = function(current, old) {
    if (current > old) {
        return "upgrade";
    }
    if (current < old) {
        return "downgrade";
    }
};


var buttons = {
    upgrade: "Start Building",
    downgrade: "Got It"
};


var planGreetings = {};

planGreetings[plans.FREE] = {
    "downgrade": {
        title: "Welcome to your Free plan",
        message: "You now have access to 2,000 video views.",
        button: buttons.downgrade
    }
};

planGreetings[plans.BASIC] = {
    "upgrade": {
        icon: icons[plans.BASIC],
        iconStyle: 'sticky',
        title: "Welcome to your Basic plan!",
        message: "Thanks for subscribing to our Basic Plan. You now have access to 10,000 video views and expanded hosting and branding options.",
        button: buttons.upgrade
    },
    "downgrade": {
        icon: icons[plans.BASIC],
        iconStyle: 'sticky',
        title: "Welcome to your Basic plan",
        message: "You now have access to 10,000 video views.",
        button: buttons.downgrade
    }
};

planGreetings[plans.PRO] = {
    "upgrade": {
        icon: icons[plans.PRO],
        iconStyle: 'sticky',
        title: "Welcome Pro!",
        message: "Video with no limits! You now have access to 50,000 video views and advanced color customization.",
        button: buttons.upgrade
    },
    "downgrade": {
        icon: icons[plans.PRO],
        iconStyle: 'sticky',
        title: "Welcome to your Pro plan",
        message: "You now have access to 50,000 video views and advanced color customization.",
        button: buttons.downgrade
    }
};

planGreetings[plans.PRO_PLUS] = {
    "upgrade": {
        icon: icons[plans.PRO_PLUS],
        iconStyle: 'sticky',
        title: "Welcome to your Pro + plan!",
        message: "You now have access to 100,000 video views.",
        button: buttons.upgrade
    },
    "downgrade": {
        icon: icons[plans.PRO_PLUS],
        iconStyle: 'sticky',
        title: "Welcome to your Pro + plan",
        message: "You now have access to 100,000 video views.",
        button: buttons.downgrade
    }
};

planGreetings[plans.PREMIUM] = {
    "upgrade": {
        icon: icons[plans.PREMIUM],
        iconStyle: 'sticky',
        title: "Welcome to your Premium plan!",
        message: "Video with no limits! You now have access to 1,000,000 video views per month and advanced customization and hosting options.",
        button: buttons.upgrade
    }
};


var downgradeAlert = {
    message: "Do you really want to downgrade?",
    type: "yesno",
    style: "red"
};


var upgradeEndscreen = {
    icon: icons[plans.PRO],
    iconStyle: 'sticky',
    title: "Custom End Screen is available in Videopath Pro plan and above.",
    message: "End screen includes custom titles, call to action, and colors for unlimited videos.",
    button: "Upgrade your plan",
    buttonTarget: "settings/plans"
};

var upgradeTheme = {
    icon: icons[plans.PRO],
    iconStyle: 'sticky',
    title: "Theming is available in Videopath Pro plan and above.",
    message: "Theming includes changing the color of your player as well as adding a custom icon to the top left of your videos.",
    button: "Upgrade your plan",
    buttonTarget: "settings/plans"
};


var accountCanceled = {
    style: 'red',
    icon: icons[plans.CANCEL],
    title: "Account Canceled",
    message: "We're sorry to see you go. <br>If you have feedback for us, please let us know at <a href='mailto:support@videopath.com'>support@videopath.com</a>."
};

var planCanceled = {
    style: 'red',
    icon: icons[plans.CANCEL],
    title: "Plan Canceled",
    message: "We're sorry to see you unsubscribe. You will stay on your current plan until your subscription period ends.<br>If you have feedback for us, please let us know at <a href='mailto:support@videopath.com'>support@videopath.com</a>."
};


module.exports = {
    greetings: planGreetings,
    downgradeAlert: downgradeAlert,
    upgradeEndscreen: upgradeEndscreen,
    upgradeTheme: upgradeTheme,
    planCanceled: planCanceled,
    accountCanceled: accountCanceled,
    selectPlanGreeting: selectPlanGreeting
};
