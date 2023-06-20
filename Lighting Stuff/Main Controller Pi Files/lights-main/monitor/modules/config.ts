import FileSystem from "fs";


let startedConfiguration = false;

const parsedConfigs = new Map<string, string | number | boolean>();

function initializeConfigurations(){
    console.log("Loading Configurations...");

    if (FileSystem.existsSync("./config.json") == false){
        let defaultConfigurations: any = {};

        for (let configurationName of parsedConfigs.keys()){
            let configurationValue = parsedConfigs.get(configurationName);

            defaultConfigurations[configurationName] = configurationValue;
        }
        
        FileSystem.writeFileSync("./config.json", JSON.stringify(defaultConfigurations));

        console.error("Stopped Process as configuration files are not present.\nCreated new Configurations.");
        process.exit(1);
    }
    
    parsedConfigs.clear();
    let configs = JSON.parse(FileSystem.readFileSync("./config.json", "utf-8"));
    
    for (let configName in configs){
        parsedConfigs.set(configName, configs[configName]);
        console.log(`Loaded [${configName}]`);
    }

    console.log("Finished Loading Configurations!");
    
}

export function setDefault(configurationName: string, configurationValue: string | number | boolean){
    if (startedConfiguration == false){
        parsedConfigs.set(configurationName, configurationValue);
    } 
}

export function getConfig(configurationName: string){
    if (startedConfiguration == false){
        startedConfiguration = true;
        initializeConfigurations();
    }
    return parsedConfigs.get(configurationName) || (()=>{
        console.error(`[${configurationName}] is not a valid configuration.`);
        process.exit(1);
    })();
}