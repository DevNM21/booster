"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_core_1 = require("@boostercloud/framework-core");
var framework_core_2 = require("@boostercloud/framework-core");
Object.defineProperty(exports, "Booster", { enumerable: true, get: function () { return framework_core_2.Booster; } });
Object.defineProperty(exports, "boosterEventDispatcher", { enumerable: true, get: function () { return framework_core_2.boosterEventDispatcher; } });
Object.defineProperty(exports, "boosterPreSignUpChecker", { enumerable: true, get: function () { return framework_core_2.boosterPreSignUpChecker; } });
Object.defineProperty(exports, "boosterServeGraphQL", { enumerable: true, get: function () { return framework_core_2.boosterServeGraphQL; } });
Object.defineProperty(exports, "boosterNotifySubscribers", { enumerable: true, get: function () { return framework_core_2.boosterNotifySubscribers; } });
Object.defineProperty(exports, "boosterTriggerScheduledCommand", { enumerable: true, get: function () { return framework_core_2.boosterTriggerScheduledCommand; } });
framework_core_1.Booster.start(__dirname);
