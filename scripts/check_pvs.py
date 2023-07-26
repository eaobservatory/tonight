import requests
import urllib.parse
import os
from dotenv import load_dotenv

load_dotenv()

username = os.getenv("ENGARCHIVE_USERNAME")
password = os.getenv("ENGARCHIVE_PASSWORD")

pvs = [
    "conb:cryo:ls1:d60:val",  # jcmtharp
    "conb:cryo:ls2:t60:val",
    "conb:cryo:ls2:int:val",
    "conb:cryo:ls2:c60:val",
    "conb:cryo:ls2:ln2:val",
    "conb:cryo:ls1:c20:val",
    "conb:cryo:ls1:d20:val",
    "conb:cryo:ls2:cst:val",
    "conb:cryo:ls2:ssb:val",
    "conb:cryo:ls1:mxl:val",
    "conb:cryo:ls1:mxr:val",
    "conb:cryo:ls1:dai:val",
    "conb:cryo:ls1:am6:val",
    "conb:cryo:vac:prl",
    "nmnCryo:ls:temp1",  # jcmtnamakanui
    "nmnCryo:ls:temp2",
    "nmnCryo:ls:temp3",
    "nmnCryo:ls:temp4",
    "mount:az:enc",  # jcmtposn
    "mount:el:enc",
    "scu2CCS:ls218a:t2",  # jcmtsc2
    "scu2CCS:ls370a:chan2:k",
    "scu2CCS:ls218b:t1",
    "scu2CCS:ls370a:chan1:k",
    "scu2CCS:ls370b:chan2:k",
    "scu2CCS:ls370b:chan12:k",
    "scu2CCS:ls370b:chan13:k",
    "scu2CCS:ls370c:chan:k",
    "scu2CCS:ls370b:chan11:k",
    "scu2CCS:ls370b:chan14:k",
    "scu2CCS:tpg256:ch5:pressAo",
    "scu2CCS:tpg256:ch6:pressAo",
    "scu2CCS:tpg256:ch4:pressAo",
    "scu2CCS:edwTIC:g3Log",
    "scu2CCS:ami185:level",
    "ws:wxt510:stat:airTemp",  # jcmttemp
    "well:hmp230:airTemp",
    "enviro:opto:back",
    "enviro:opto:front",
    "enviro:opto:llr:real",
    "enviro:opto:lrr:real",
    "enviro:opto:ulr:real",
    "enviro:opto:urr:real",
    "enviro:opto:llf:real",
    "enviro:opto:lrf:real",
    "enviro:opto:ulf:real",
    "enviro:opto:urf:real",
    "enviro:dewpoint",
    "ws:wxt510:stat:airTemp",  # jcmtwx
    "ws:wxt510:stat:humidity",
    "ws:wxt510:stat:pressure",
    "ws:wxt510:stat:windSpd",
    "ws:wxt510:stat:windDir",
    "enviro:dewpoint",
]

for pv in pvs:
    url = f"http://{username}:{password}@engarchive.eao.hawaii.edu/cgi-bin/CGIExport.cgi?DIRECTORY=%2Fjcmtdata%2Fepics_data%2Fchanarch%2Fdir&PATTERN=&NAMES={urllib.parse.quote(pv)}%0D%0A&STARTMONTH=07&STARTDAY=14&STARTYEAR=2023&STARTHOUR=14&STARTMINUTE=00&STARTSECOND=00&ENDMONTH=07&ENDDAY=15&ENDYEAR=2023&ENDHOUR=13&ENDMINUTE=59&ENDSECOND=59&COMMAND=GET&Y0=0&Y1=0&REDUCE=ON&FORMAT=SPREADSHEET&INTERPOL=0"
    response = requests.get(url)
    lines = response.text.split("\n")
    if lines[0] != "; Generated from archive data":
        print(f"ERROR: {pv}")
    else:
        print(f"OK: {pv}")

## OUTPUT
# OK: conb:cryo:ls1:d60:val
# OK: conb:cryo:ls2:t60:val
# OK: conb:cryo:ls2:int:val
# OK: conb:cryo:ls2:c60:val
# OK: conb:cryo:ls2:ln2:val
# OK: conb:cryo:ls1:c20:val
# OK: conb:cryo:ls1:d20:val
# OK: conb:cryo:ls2:cst:val
# OK: conb:cryo:ls2:ssb:val
# OK: conb:cryo:ls1:mxl:val
# ERROR: conb:cryo:ls1:mxr:val
# OK: conb:cryo:ls1:dai:val
# OK: conb:cryo:ls1:am6:val
# OK: conb:cryo:vac:prl
# OK: nmnCryo:ls:temp1
# OK: nmnCryo:ls:temp2
# OK: nmnCryo:ls:temp3
# OK: nmnCryo:ls:temp4
# OK: mount:az:enc
# OK: mount:el:enc
# OK: scu2CCS:ls218a:t2
# OK: scu2CCS:ls370a:chan2:k
# OK: scu2CCS:ls218b:t1
# OK: scu2CCS:ls370a:chan1:k
# OK: scu2CCS:ls370b:chan2:k
# OK: scu2CCS:ls370b:chan12:k
# OK: scu2CCS:ls370b:chan13:k
# OK: scu2CCS:ls370c:chan:k
# OK: scu2CCS:ls370b:chan11:k
# OK: scu2CCS:ls370b:chan14:k
# OK: scu2CCS:tpg256:ch5:pressAo
# OK: scu2CCS:tpg256:ch6:pressAo
# OK: scu2CCS:tpg256:ch4:pressAo
# OK: scu2CCS:edwTIC:g3Log
# OK: scu2CCS:ami185:level
# OK: ws:wxt510:stat:airTemp
# OK: well:hmp230:airTemp
# OK: enviro:opto:back
# OK: enviro:opto:front
# OK: enviro:opto:llr:real
# OK: enviro:opto:lrr:real
# OK: enviro:opto:ulr:real
# OK: enviro:opto:urr:real
# OK: enviro:opto:llf:real
# OK: enviro:opto:lrf:real
# OK: enviro:opto:ulf:real
# OK: enviro:opto:urf:real
# ERROR: enviro:dewpoint
# OK: ws:wxt510:stat:airTemp
# OK: ws:wxt510:stat:humidity
# OK: ws:wxt510:stat:pressure
# OK: ws:wxt510:stat:windSpd
# OK: ws:wxt510:stat:windDir
# ERROR: enviro:dewpoint
