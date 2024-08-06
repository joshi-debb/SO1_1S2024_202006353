import React, { useState } from 'react';
import Graph from 'graphviz-react';

const procesos = [
    {"pid":1,
    "nombre":"systemd",
    "usuario": 0,
    "hijo":[
    {"pid":273,
    "nombre":"systemd-journal",
    "pidPadre":1
    }
    ,{"pid":332,
    "nombre":"systemd-udevd",
    "pidPadre":1
    }
    ,{"pid":495,
    "nombre":"systemd-oomd",
    "pidPadre":1
    }
    ,{"pid":503,
    "nombre":"systemd-resolve",
    "pidPadre":1
    }
    ,{"pid":573,
    "nombre":"accounts-daemon",
    "pidPadre":1
    }
    ,{"pid":574,
    "nombre":"acpid",
    "pidPadre":1
    }
    ,{"pid":577,
    "nombre":"avahi-daemon",
    "pidPadre":1
    }
    ,{"pid":578,
    "nombre":"bluetoothd",
    "pidPadre":1
    }
    ,{"pid":580,
    "nombre":"cron",
    "pidPadre":1
    }
    ,{"pid":582,
    "nombre":"dbus-daemon",
    "pidPadre":1
    }
    ,{"pid":584,
    "nombre":"NetworkManager",
    "pidPadre":1
    }
    ,{"pid":594,
    "nombre":"irqbalance",
    "pidPadre":1
    }
    ,{"pid":597,
    "nombre":"networkd-dispat",
    "pidPadre":1
    }
    ,{"pid":598,
    "nombre":"polkitd",
    "pidPadre":1
    }
    ,{"pid":602,
    "nombre":"power-profiles-",
    "pidPadre":1
    }
    ,{"pid":605,
    "nombre":"rsyslogd",
    "pidPadre":1
    }
    ,{"pid":613,
    "nombre":"snapd",
    "pidPadre":1
    }
    ,{"pid":614,
    "nombre":"switcheroo-cont",
    "pidPadre":1
    }
    ,{"pid":615,
    "nombre":"systemd-logind",
    "pidPadre":1
    }
    ,{"pid":618,
    "nombre":"udisksd",
    "pidPadre":1
    }
    ,{"pid":620,
    "nombre":"wpa_supplicant",
    "pidPadre":1
    }
    ,{"pid":665,
    "nombre":"ModemManager",
    "pidPadre":1
    }
    ,{"pid":671,
    "nombre":"cupsd",
    "pidPadre":1
    }
    ,{"pid":679,
    "nombre":"containerd",
    "pidPadre":1
    }
    ,{"pid":718,
    "nombre":"gdm3",
    "pidPadre":1
    }
    ,{"pid":756,
    "nombre":"unattended-upgr",
    "pidPadre":1
    }
    ,{"pid":974,
    "nombre":"systemd",
    "pidPadre":1
    }
    ,{"pid":1009,
    "nombre":"gnome-keyring-d",
    "pidPadre":1
    }
    ,{"pid":1013,
    "nombre":"rtkit-daemon",
    "pidPadre":1
    }
    ,{"pid":1316,
    "nombre":"upowerd",
    "pidPadre":1
    }
    ,{"pid":1320,
    "nombre":"geoclue",
    "pidPadre":1
    }
    ,{"pid":1388,
    "nombre":"packagekitd",
    "pidPadre":1
    }
    ,{"pid":1600,
    "nombre":"colord",
    "pidPadre":1
    }
    ,{"pid":2078,
    "nombre":"cups-browsed",
    "pidPadre":1
    }
    ,{"pid":2116,
    "nombre":"dockerd",
    "pidPadre":1
    }
    ,{"pid":2119,
    "nombre":"kerneloops",
    "pidPadre":1
    }
    ,{"pid":2121,
    "nombre":"kerneloops",
    "pidPadre":1
    }
    ,{"pid":73232,
    "nombre":"containerd-shim",
    "pidPadre":1
    }
    
    ]}
    ,{"pid":2,
    "nombre":"kthreadd",
    "usuario": 0,
    "hijo":[
    {"pid":3,
    "nombre":"rcu_gp",
    "pidPadre":2
    }
    ,{"pid":4,
    "nombre":"rcu_par_gp",
    "pidPadre":2
    }
    ,{"pid":5,
    "nombre":"slub_flushwq",
    "pidPadre":2
    }
    ,{"pid":6,
    "nombre":"netns",
    "pidPadre":2
    }
    ,{"pid":8,
    "nombre":"kworker/0:0H",
    "pidPadre":2
    }
    ,{"pid":11,
    "nombre":"mm_percpu_wq",
    "pidPadre":2
    }
    ,{"pid":12,
    "nombre":"rcu_tasks_kthre",
    "pidPadre":2
    }
    ,{"pid":13,
    "nombre":"rcu_tasks_rude_",
    "pidPadre":2
    }
    ,{"pid":14,
    "nombre":"rcu_tasks_trace",
    "pidPadre":2
    }
    ,{"pid":15,
    "nombre":"ksoftirqd/0",
    "pidPadre":2
    }
    ,{"pid":16,
    "nombre":"rcu_preempt",
    "pidPadre":2
    }
    ,{"pid":17,
    "nombre":"migration/0",
    "pidPadre":2
    }
    ,{"pid":18,
    "nombre":"idle_inject/0",
    "pidPadre":2
    }
    ,{"pid":19,
    "nombre":"cpuhp/0",
    "pidPadre":2
    }
    ,{"pid":20,
    "nombre":"cpuhp/1",
    "pidPadre":2
    }
    ,{"pid":21,
    "nombre":"idle_inject/1",
    "pidPadre":2
    }
    ,{"pid":22,
    "nombre":"migration/1",
    "pidPadre":2
    }
    ,{"pid":23,
    "nombre":"ksoftirqd/1",
    "pidPadre":2
    }
    ,{"pid":26,
    "nombre":"cpuhp/2",
    "pidPadre":2
    }
    ,{"pid":27,
    "nombre":"idle_inject/2",
    "pidPadre":2
    }
    ,{"pid":28,
    "nombre":"migration/2",
    "pidPadre":2
    }
    ,{"pid":29,
    "nombre":"ksoftirqd/2",
    "pidPadre":2
    }
    ,{"pid":32,
    "nombre":"cpuhp/3",
    "pidPadre":2
    }
    ,{"pid":33,
    "nombre":"idle_inject/3",
    "pidPadre":2
    }
    ,{"pid":34,
    "nombre":"migration/3",
    "pidPadre":2
    }
    ,{"pid":35,
    "nombre":"ksoftirqd/3",
    "pidPadre":2
    }
    ,{"pid":38,
    "nombre":"cpuhp/4",
    "pidPadre":2
    }
    ,{"pid":39,
    "nombre":"idle_inject/4",
    "pidPadre":2
    }
    ,{"pid":40,
    "nombre":"migration/4",
    "pidPadre":2
    }
    ,{"pid":41,
    "nombre":"ksoftirqd/4",
    "pidPadre":2
    }
    ,{"pid":44,
    "nombre":"cpuhp/5",
    "pidPadre":2
    }
    ,{"pid":45,
    "nombre":"idle_inject/5",
    "pidPadre":2
    }
    ,{"pid":46,
    "nombre":"migration/5",
    "pidPadre":2
    }
    ,{"pid":47,
    "nombre":"ksoftirqd/5",
    "pidPadre":2
    }
    ,{"pid":50,
    "nombre":"cpuhp/6",
    "pidPadre":2
    }
    ,{"pid":51,
    "nombre":"idle_inject/6",
    "pidPadre":2
    }
    ,{"pid":52,
    "nombre":"migration/6",
    "pidPadre":2
    }
    ,{"pid":53,
    "nombre":"ksoftirqd/6",
    "pidPadre":2
    }
    ,{"pid":56,
    "nombre":"cpuhp/7",
    "pidPadre":2
    }
    ,{"pid":57,
    "nombre":"idle_inject/7",
    "pidPadre":2
    }
    ,{"pid":58,
    "nombre":"migration/7",
    "pidPadre":2
    }
    ,{"pid":59,
    "nombre":"ksoftirqd/7",
    "pidPadre":2
    }
    ,{"pid":62,
    "nombre":"kdevtmpfs",
    "pidPadre":2
    }
    ,{"pid":63,
    "nombre":"inet_frag_wq",
    "pidPadre":2
    }
    ,{"pid":65,
    "nombre":"kauditd",
    "pidPadre":2
    }
    ,{"pid":66,
    "nombre":"khungtaskd",
    "pidPadre":2
    }
    ,{"pid":67,
    "nombre":"oom_reaper",
    "pidPadre":2
    }
    ,{"pid":69,
    "nombre":"writeback",
    "pidPadre":2
    }
    ,{"pid":70,
    "nombre":"kcompactd0",
    "pidPadre":2
    }
    ,{"pid":71,
    "nombre":"ksmd",
    "pidPadre":2
    }
    ,{"pid":72,
    "nombre":"khugepaged",
    "pidPadre":2
    }
    ,{"pid":73,
    "nombre":"kintegrityd",
    "pidPadre":2
    }
    ,{"pid":74,
    "nombre":"kblockd",
    "pidPadre":2
    }
    ,{"pid":75,
    "nombre":"blkcg_punt_bio",
    "pidPadre":2
    }
    ,{"pid":78,
    "nombre":"tpm_dev_wq",
    "pidPadre":2
    }
    ,{"pid":79,
    "nombre":"ata_sff",
    "pidPadre":2
    }
    ,{"pid":80,
    "nombre":"md",
    "pidPadre":2
    }
    ,{"pid":81,
    "nombre":"md_bitmap",
    "pidPadre":2
    }
    ,{"pid":82,
    "nombre":"edac-poller",
    "pidPadre":2
    }
    ,{"pid":83,
    "nombre":"devfreq_wq",
    "pidPadre":2
    }
    ,{"pid":84,
    "nombre":"watchdogd",
    "pidPadre":2
    }
    ,{"pid":86,
    "nombre":"irq/25-AMD-Vi",
    "pidPadre":2
    }
    ,{"pid":88,
    "nombre":"kswapd0",
    "pidPadre":2
    }
    ,{"pid":89,
    "nombre":"ecryptfs-kthrea",
    "pidPadre":2
    }
    ,{"pid":90,
    "nombre":"kthrotld",
    "pidPadre":2
    }
    ,{"pid":91,
    "nombre":"irq/27-pciehp",
    "pidPadre":2
    }
    ,{"pid":92,
    "nombre":"irq/28-pciehp",
    "pidPadre":2
    }
    ,{"pid":93,
    "nombre":"kworker/4:1",
    "pidPadre":2
    }
    ,{"pid":97,
    "nombre":"acpi_thermal_pm",
    "pidPadre":2
    }
    ,{"pid":98,
    "nombre":"hwrng",
    "pidPadre":2
    }
    ,{"pid":99,
    "nombre":"mld",
    "pidPadre":2
    }
    ,{"pid":100,
    "nombre":"ipv6_addrconf",
    "pidPadre":2
    }
    ,{"pid":109,
    "nombre":"kstrp",
    "pidPadre":2
    }
    ,{"pid":115,
    "nombre":"charger_manager",
    "pidPadre":2
    }
    ,{"pid":162,
    "nombre":"irq/32-SYNA30AC",
    "pidPadre":2
    }
    ,{"pid":188,
    "nombre":"nvme-wq",
    "pidPadre":2
    }
    ,{"pid":189,
    "nombre":"nvme-reset-wq",
    "pidPadre":2
    }
    ,{"pid":190,
    "nombre":"nvme-delete-wq",
    "pidPadre":2
    }
    ,{"pid":191,
    "nombre":"nvme-auth-wq",
    "pidPadre":2
    }
    ,{"pid":193,
    "nombre":"scsi_eh_0",
    "pidPadre":2
    }
    ,{"pid":194,
    "nombre":"scsi_tmf_0",
    "pidPadre":2
    }
    ,{"pid":195,
    "nombre":"scsi_eh_1",
    "pidPadre":2
    }
    ,{"pid":196,
    "nombre":"scsi_tmf_1",
    "pidPadre":2
    }
    ,{"pid":198,
    "nombre":"scsi_eh_2",
    "pidPadre":2
    }
    ,{"pid":199,
    "nombre":"scsi_tmf_2",
    "pidPadre":2
    }
    ,{"pid":200,
    "nombre":"scsi_eh_3",
    "pidPadre":2
    }
    ,{"pid":201,
    "nombre":"scsi_tmf_3",
    "pidPadre":2
    }
    ,{"pid":232,
    "nombre":"jbd2/nvme0n1p5-",
    "pidPadre":2
    }
    ,{"pid":233,
    "nombre":"ext4-rsv-conver",
    "pidPadre":2
    }
    ,{"pid":395,
    "nombre":"cfg80211",
    "pidPadre":2
    }
    ,{"pid":398,
    "nombre":"cryptd",
    "pidPadre":2
    }
    ,{"pid":408,
    "nombre":"irq/80-iwlwifi:",
    "pidPadre":2
    }
    ,{"pid":411,
    "nombre":"irq/81-iwlwifi:",
    "pidPadre":2
    }
    ,{"pid":412,
    "nombre":"irq/82-iwlwifi:",
    "pidPadre":2
    }
    ,{"pid":413,
    "nombre":"irq/83-iwlwifi:",
    "pidPadre":2
    }
    ,{"pid":414,
    "nombre":"irq/84-iwlwifi:",
    "pidPadre":2
    }
    ,{"pid":415,
    "nombre":"irq/85-iwlwifi:",
    "pidPadre":2
    }
    ,{"pid":416,
    "nombre":"irq/86-iwlwifi:",
    "pidPadre":2
    }
    ,{"pid":417,
    "nombre":"irq/87-iwlwifi:",
    "pidPadre":2
    }
    ,{"pid":418,
    "nombre":"irq/88-iwlwifi:",
    "pidPadre":2
    }
    ,{"pid":419,
    "nombre":"irq/89-iwlwifi:",
    "pidPadre":2
    }
    ,{"pid":498,
    "nombre":"amd_iommu_v2",
    "pidPadre":2
    }
    ,{"pid":585,
    "nombre":"amdgpu-reset-de",
    "pidPadre":2
    }
    ,{"pid":601,
    "nombre":"ttm",
    "pidPadre":2
    }
    ,{"pid":788,
    "nombre":"amdgpu_dm_hpd_r",
    "pidPadre":2
    }
    ,{"pid":789,
    "nombre":"amdgpu_dm_hpd_r",
    "pidPadre":2
    }
    ,{"pid":790,
    "nombre":"amdgpu_dm_hpd_r",
    "pidPadre":2
    }
    ,{"pid":791,
    "nombre":"amdgpu_dm_hpd_r",
    "pidPadre":2
    }
    ,{"pid":792,
    "nombre":"dm_vblank_contr",
    "pidPadre":2
    }
    ,{"pid":824,
    "nombre":"card0-crtc0",
    "pidPadre":2
    }
    ,{"pid":825,
    "nombre":"card0-crtc1",
    "pidPadre":2
    }
    ,{"pid":826,
    "nombre":"card0-crtc2",
    "pidPadre":2
    }
    ,{"pid":827,
    "nombre":"card0-crtc3",
    "pidPadre":2
    }
    ,{"pid":833,
    "nombre":"gfx_low",
    "pidPadre":2
    }
    ,{"pid":835,
    "nombre":"gfx_high",
    "pidPadre":2
    }
    ,{"pid":836,
    "nombre":"comp_1.0.0",
    "pidPadre":2
    }
    ,{"pid":837,
    "nombre":"comp_1.1.0",
    "pidPadre":2
    }
    ,{"pid":838,
    "nombre":"comp_1.2.0",
    "pidPadre":2
    }
    ,{"pid":839,
    "nombre":"comp_1.3.0",
    "pidPadre":2
    }
    ,{"pid":840,
    "nombre":"comp_1.0.1",
    "pidPadre":2
    }
    ,{"pid":841,
    "nombre":"comp_1.1.1",
    "pidPadre":2
    }
    ,{"pid":842,
    "nombre":"comp_1.2.1",
    "pidPadre":2
    }
    ,{"pid":843,
    "nombre":"comp_1.3.1",
    "pidPadre":2
    }
    ,{"pid":844,
    "nombre":"sdma0",
    "pidPadre":2
    }
    ,{"pid":845,
    "nombre":"vcn_dec",
    "pidPadre":2
    }
    ,{"pid":846,
    "nombre":"vcn_enc0",
    "pidPadre":2
    }
    ,{"pid":847,
    "nombre":"vcn_enc1",
    "pidPadre":2
    }
    ,{"pid":848,
    "nombre":"jpeg_dec",
    "pidPadre":2
    }
    ,{"pid":1100,
    "nombre":"krfcommd",
    "pidPadre":2
    }
    ,{"pid":22665,
    "nombre":"kworker/u33:1",
    "pidPadre":2
    }
    ,{"pid":73131,
    "nombre":"kworker/3:2",
    "pidPadre":2
    }
    ,{"pid":76546,
    "nombre":"kworker/5:1H",
    "pidPadre":2
    }
    ,{"pid":77437,
    "nombre":"kworker/u32:5",
    "pidPadre":2
    }
    ,{"pid":77568,
    "nombre":"kworker/4:0H",
    "pidPadre":2
    }
    ,{"pid":77591,
    "nombre":"kworker/1:1H",
    "pidPadre":2
    }
    ,{"pid":77599,
    "nombre":"kworker/2:0H",
    "pidPadre":2
    }
    ,{"pid":81175,
    "nombre":"kworker/3:0H",
    "pidPadre":2
    }
    ,{"pid":88088,
    "nombre":"kworker/0:1",
    "pidPadre":2
    }
    ,{"pid":89333,
    "nombre":"kworker/1:0H",
    "pidPadre":2
    }
    ,{"pid":89734,
    "nombre":"kworker/7:2H",
    "pidPadre":2
    }
    ,{"pid":89924,
    "nombre":"kworker/2:1",
    "pidPadre":2
    }
    ,{"pid":92909,
    "nombre":"kworker/6:0H",
    "pidPadre":2
    }
    ,{"pid":93058,
    "nombre":"kworker/7:1H",
    "pidPadre":2
    }
    ,{"pid":93417,
    "nombre":"kworker/0:2H",
    "pidPadre":2
    }
    ,{"pid":93600,
    "nombre":"kworker/4:1H",
    "pidPadre":2
    }
    ,{"pid":94056,
    "nombre":"kworker/5:0H",
    "pidPadre":2
    }
    ,{"pid":94174,
    "nombre":"kworker/1:2",
    "pidPadre":2
    }
    ,{"pid":94694,
    "nombre":"kworker/5:2",
    "pidPadre":2
    }
    ,{"pid":97716,
    "nombre":"kworker/4:2",
    "pidPadre":2
    }
    ,{"pid":97722,
    "nombre":"kworker/1:1",
    "pidPadre":2
    }
    ,{"pid":98839,
    "nombre":"kworker/6:2H",
    "pidPadre":2
    }
    ,{"pid":102404,
    "nombre":"kworker/u32:0",
    "pidPadre":2
    }
    ,{"pid":105180,
    "nombre":"kworker/6:1",
    "pidPadre":2
    }
    ,{"pid":113947,
    "nombre":"kworker/2:1H",
    "pidPadre":2
    }
    ,{"pid":113949,
    "nombre":"kworker/3:1H",
    "pidPadre":2
    }
    ,{"pid":114066,
    "nombre":"kworker/3:0",
    "pidPadre":2
    }
    ,{"pid":114425,
    "nombre":"kworker/u33:0",
    "pidPadre":2
    }
    ,{"pid":114829,
    "nombre":"kworker/7:2",
    "pidPadre":2
    }
    ,{"pid":118435,
    "nombre":"kworker/u32:2",
    "pidPadre":2
    }
    ,{"pid":119187,
    "nombre":"kworker/2:0",
    "pidPadre":2
    }
    ,{"pid":120121,
    "nombre":"kworker/7:1",
    "pidPadre":2
    }
    ,{"pid":120438,
    "nombre":"kworker/0:0",
    "pidPadre":2
    }
    ,{"pid":123938,
    "nombre":"kworker/5:0",
    "pidPadre":2
    }
    ,{"pid":124288,
    "nombre":"kworker/6:0",
    "pidPadre":2
    }
    ,{"pid":124581,
    "nombre":"kworker/u32:1",
    "pidPadre":2
    }
    ,{"pid":126579,
    "nombre":"kworker/5:2H",
    "pidPadre":2
    }
    ,{"pid":126646,
    "nombre":"kworker/7:0",
    "pidPadre":2
    }
    ,{"pid":127076,
    "nombre":"kworker/6:2",
    "pidPadre":2
    }
    ,{"pid":127276,
    "nombre":"kworker/5:1",
    "pidPadre":2
    }
    
    ]}
    ,{"pid":3,
    "nombre":"rcu_gp",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":4,
    "nombre":"rcu_par_gp",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":5,
    "nombre":"slub_flushwq",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":6,
    "nombre":"netns",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":8,
    "nombre":"kworker/0:0H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":11,
    "nombre":"mm_percpu_wq",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":12,
    "nombre":"rcu_tasks_kthre",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":13,
    "nombre":"rcu_tasks_rude_",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":14,
    "nombre":"rcu_tasks_trace",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":15,
    "nombre":"ksoftirqd/0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":16,
    "nombre":"rcu_preempt",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":17,
    "nombre":"migration/0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":18,
    "nombre":"idle_inject/0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":19,
    "nombre":"cpuhp/0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":20,
    "nombre":"cpuhp/1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":21,
    "nombre":"idle_inject/1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":22,
    "nombre":"migration/1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":23,
    "nombre":"ksoftirqd/1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":26,
    "nombre":"cpuhp/2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":27,
    "nombre":"idle_inject/2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":28,
    "nombre":"migration/2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":29,
    "nombre":"ksoftirqd/2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":32,
    "nombre":"cpuhp/3",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":33,
    "nombre":"idle_inject/3",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":34,
    "nombre":"migration/3",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":35,
    "nombre":"ksoftirqd/3",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":38,
    "nombre":"cpuhp/4",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":39,
    "nombre":"idle_inject/4",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":40,
    "nombre":"migration/4",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":41,
    "nombre":"ksoftirqd/4",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":44,
    "nombre":"cpuhp/5",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":45,
    "nombre":"idle_inject/5",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":46,
    "nombre":"migration/5",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":47,
    "nombre":"ksoftirqd/5",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":50,
    "nombre":"cpuhp/6",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":51,
    "nombre":"idle_inject/6",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":52,
    "nombre":"migration/6",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":53,
    "nombre":"ksoftirqd/6",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":56,
    "nombre":"cpuhp/7",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":57,
    "nombre":"idle_inject/7",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":58,
    "nombre":"migration/7",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":59,
    "nombre":"ksoftirqd/7",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":62,
    "nombre":"kdevtmpfs",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":63,
    "nombre":"inet_frag_wq",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":65,
    "nombre":"kauditd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":66,
    "nombre":"khungtaskd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":67,
    "nombre":"oom_reaper",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":69,
    "nombre":"writeback",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":70,
    "nombre":"kcompactd0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":71,
    "nombre":"ksmd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":72,
    "nombre":"khugepaged",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":73,
    "nombre":"kintegrityd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":74,
    "nombre":"kblockd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":75,
    "nombre":"blkcg_punt_bio",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":78,
    "nombre":"tpm_dev_wq",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":79,
    "nombre":"ata_sff",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":80,
    "nombre":"md",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":81,
    "nombre":"md_bitmap",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":82,
    "nombre":"edac-poller",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":83,
    "nombre":"devfreq_wq",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":84,
    "nombre":"watchdogd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":86,
    "nombre":"irq/25-AMD-Vi",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":88,
    "nombre":"kswapd0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":89,
    "nombre":"ecryptfs-kthrea",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":90,
    "nombre":"kthrotld",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":91,
    "nombre":"irq/27-pciehp",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":92,
    "nombre":"irq/28-pciehp",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":93,
    "nombre":"kworker/4:1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":97,
    "nombre":"acpi_thermal_pm",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":98,
    "nombre":"hwrng",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":99,
    "nombre":"mld",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":100,
    "nombre":"ipv6_addrconf",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":109,
    "nombre":"kstrp",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":115,
    "nombre":"charger_manager",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":162,
    "nombre":"irq/32-SYNA30AC",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":188,
    "nombre":"nvme-wq",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":189,
    "nombre":"nvme-reset-wq",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":190,
    "nombre":"nvme-delete-wq",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":191,
    "nombre":"nvme-auth-wq",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":193,
    "nombre":"scsi_eh_0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":194,
    "nombre":"scsi_tmf_0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":195,
    "nombre":"scsi_eh_1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":196,
    "nombre":"scsi_tmf_1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":198,
    "nombre":"scsi_eh_2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":199,
    "nombre":"scsi_tmf_2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":200,
    "nombre":"scsi_eh_3",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":201,
    "nombre":"scsi_tmf_3",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":232,
    "nombre":"jbd2/nvme0n1p5-",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":233,
    "nombre":"ext4-rsv-conver",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":273,
    "nombre":"systemd-journal",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":332,
    "nombre":"systemd-udevd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":395,
    "nombre":"cfg80211",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":398,
    "nombre":"cryptd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":408,
    "nombre":"irq/80-iwlwifi:",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":411,
    "nombre":"irq/81-iwlwifi:",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":412,
    "nombre":"irq/82-iwlwifi:",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":413,
    "nombre":"irq/83-iwlwifi:",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":414,
    "nombre":"irq/84-iwlwifi:",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":415,
    "nombre":"irq/85-iwlwifi:",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":416,
    "nombre":"irq/86-iwlwifi:",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":417,
    "nombre":"irq/87-iwlwifi:",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":418,
    "nombre":"irq/88-iwlwifi:",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":419,
    "nombre":"irq/89-iwlwifi:",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":495,
    "nombre":"systemd-oomd",
    "usuario": 108,
    "hijo":[
    
    ]}
    ,{"pid":498,
    "nombre":"amd_iommu_v2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":503,
    "nombre":"systemd-resolve",
    "usuario": 101,
    "hijo":[
    
    ]}
    ,{"pid":573,
    "nombre":"accounts-daemon",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":574,
    "nombre":"acpid",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":577,
    "nombre":"avahi-daemon",
    "usuario": 114,
    "hijo":[
    {"pid":630,
    "nombre":"avahi-daemon",
    "pidPadre":577
    }
    
    ]}
    ,{"pid":578,
    "nombre":"bluetoothd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":580,
    "nombre":"cron",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":582,
    "nombre":"dbus-daemon",
    "usuario": 102,
    "hijo":[
    
    ]}
    ,{"pid":584,
    "nombre":"NetworkManager",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":585,
    "nombre":"amdgpu-reset-de",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":594,
    "nombre":"irqbalance",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":597,
    "nombre":"networkd-dispat",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":598,
    "nombre":"polkitd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":601,
    "nombre":"ttm",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":602,
    "nombre":"power-profiles-",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":605,
    "nombre":"rsyslogd",
    "usuario": 104,
    "hijo":[
    
    ]}
    ,{"pid":613,
    "nombre":"snapd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":614,
    "nombre":"switcheroo-cont",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":615,
    "nombre":"systemd-logind",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":618,
    "nombre":"udisksd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":620,
    "nombre":"wpa_supplicant",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":630,
    "nombre":"avahi-daemon",
    "usuario": 114,
    "hijo":[
    
    ]}
    ,{"pid":665,
    "nombre":"ModemManager",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":671,
    "nombre":"cupsd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":679,
    "nombre":"containerd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":718,
    "nombre":"gdm3",
    "usuario": 0,
    "hijo":[
    {"pid":907,
    "nombre":"gdm-session-wor",
    "pidPadre":718
    }
    
    ]}
    ,{"pid":756,
    "nombre":"unattended-upgr",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":788,
    "nombre":"amdgpu_dm_hpd_r",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":789,
    "nombre":"amdgpu_dm_hpd_r",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":790,
    "nombre":"amdgpu_dm_hpd_r",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":791,
    "nombre":"amdgpu_dm_hpd_r",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":792,
    "nombre":"dm_vblank_contr",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":824,
    "nombre":"card0-crtc0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":825,
    "nombre":"card0-crtc1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":826,
    "nombre":"card0-crtc2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":827,
    "nombre":"card0-crtc3",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":833,
    "nombre":"gfx_low",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":835,
    "nombre":"gfx_high",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":836,
    "nombre":"comp_1.0.0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":837,
    "nombre":"comp_1.1.0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":838,
    "nombre":"comp_1.2.0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":839,
    "nombre":"comp_1.3.0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":840,
    "nombre":"comp_1.0.1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":841,
    "nombre":"comp_1.1.1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":842,
    "nombre":"comp_1.2.1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":843,
    "nombre":"comp_1.3.1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":844,
    "nombre":"sdma0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":845,
    "nombre":"vcn_dec",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":846,
    "nombre":"vcn_enc0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":847,
    "nombre":"vcn_enc1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":848,
    "nombre":"jpeg_dec",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":907,
    "nombre":"gdm-session-wor",
    "usuario": 0,
    "hijo":[
    {"pid":1018,
    "nombre":"gdm-x-session",
    "pidPadre":907
    }
    
    ]}
    ,{"pid":974,
    "nombre":"systemd",
    "usuario": 1000,
    "hijo":[
    {"pid":983,
    "nombre":"(sd-pam)",
    "pidPadre":974
    }
    ,{"pid":991,
    "nombre":"pipewire",
    "pidPadre":974
    }
    ,{"pid":992,
    "nombre":"pipewire-media-",
    "pidPadre":974
    }
    ,{"pid":993,
    "nombre":"pulseaudio",
    "pidPadre":974
    }
    ,{"pid":1023,
    "nombre":"dbus-daemon",
    "pidPadre":974
    }
    ,{"pid":1034,
    "nombre":"xdg-document-po",
    "pidPadre":974
    }
    ,{"pid":1037,
    "nombre":"xdg-permission-",
    "pidPadre":974
    }
    ,{"pid":1192,
    "nombre":"at-spi-bus-laun",
    "pidPadre":974
    }
    ,{"pid":1228,
    "nombre":"gnome-session-c",
    "pidPadre":974
    }
    ,{"pid":1239,
    "nombre":"gvfsd",
    "pidPadre":974
    }
    ,{"pid":1247,
    "nombre":"gvfsd-fuse",
    "pidPadre":974
    }
    ,{"pid":1249,
    "nombre":"gnome-session-b",
    "pidPadre":974
    }
    ,{"pid":1275,
    "nombre":"gnome-shell",
    "pidPadre":974
    }
    ,{"pid":1314,
    "nombre":"evolution-sourc",
    "pidPadre":974
    }
    ,{"pid":1322,
    "nombre":"dconf-service",
    "pidPadre":974
    }
    ,{"pid":1331,
    "nombre":"gvfs-udisks2-vo",
    "pidPadre":974
    }
    ,{"pid":1337,
    "nombre":"evolution-calen",
    "pidPadre":974
    }
    ,{"pid":1343,
    "nombre":"gvfs-gphoto2-vo",
    "pidPadre":974
    }
    ,{"pid":1348,
    "nombre":"gvfs-goa-volume",
    "pidPadre":974
    }
    ,{"pid":1306,
    "nombre":"gnome-shell-cal",
    "pidPadre":974
    }
    ,{"pid":1329,
    "nombre":"goa-daemon",
    "pidPadre":974
    }
    ,{"pid":1359,
    "nombre":"gvfs-mtp-volume",
    "pidPadre":974
    }
    ,{"pid":1357,
    "nombre":"goa-identity-se",
    "pidPadre":974
    }
    ,{"pid":1371,
    "nombre":"gvfs-afc-volume",
    "pidPadre":974
    }
    ,{"pid":1378,
    "nombre":"evolution-addre",
    "pidPadre":974
    }
    ,{"pid":1413,
    "nombre":"at-spi2-registr",
    "pidPadre":974
    }
    ,{"pid":1429,
    "nombre":"xdg-desktop-por",
    "pidPadre":974
    }
    ,{"pid":1411,
    "nombre":"gjs",
    "pidPadre":974
    }
    ,{"pid":1434,
    "nombre":"sh",
    "pidPadre":974
    }
    ,{"pid":1435,
    "nombre":"gsd-a11y-settin",
    "pidPadre":974
    }
    ,{"pid":1439,
    "nombre":"gsd-color",
    "pidPadre":974
    }
    ,{"pid":1443,
    "nombre":"gsd-datetime",
    "pidPadre":974
    }
    ,{"pid":1446,
    "nombre":"gsd-housekeepin",
    "pidPadre":974
    }
    ,{"pid":1448,
    "nombre":"gsd-keyboard",
    "pidPadre":974
    }
    ,{"pid":1449,
    "nombre":"gsd-media-keys",
    "pidPadre":974
    }
    ,{"pid":1450,
    "nombre":"gsd-power",
    "pidPadre":974
    }
    ,{"pid":1451,
    "nombre":"gsd-print-notif",
    "pidPadre":974
    }
    ,{"pid":1454,
    "nombre":"gsd-rfkill",
    "pidPadre":974
    }
    ,{"pid":1456,
    "nombre":"gsd-screensaver",
    "pidPadre":974
    }
    ,{"pid":1457,
    "nombre":"gsd-sharing",
    "pidPadre":974
    }
    ,{"pid":1461,
    "nombre":"gsd-smartcard",
    "pidPadre":974
    }
    ,{"pid":1464,
    "nombre":"gsd-sound",
    "pidPadre":974
    }
    ,{"pid":1466,
    "nombre":"gsd-wacom",
    "pidPadre":974
    }
    ,{"pid":1469,
    "nombre":"gsd-xsettings",
    "pidPadre":974
    }
    ,{"pid":1497,
    "nombre":"ibus-x11",
    "pidPadre":974
    }
    ,{"pid":1499,
    "nombre":"xdg-desktop-por",
    "pidPadre":974
    }
    ,{"pid":1505,
    "nombre":"ibus-portal",
    "pidPadre":974
    }
    ,{"pid":1540,
    "nombre":"snap-store",
    "pidPadre":974
    }
    ,{"pid":1667,
    "nombre":"gjs",
    "pidPadre":974
    }
    ,{"pid":1721,
    "nombre":"gsd-printer",
    "pidPadre":974
    }
    ,{"pid":1723,
    "nombre":"tracker-miner-f",
    "pidPadre":974
    }
    ,{"pid":1789,
    "nombre":"xdg-desktop-por",
    "pidPadre":974
    }
    ,{"pid":1828,
    "nombre":"snapd-desktop-i",
    "pidPadre":974
    }
    ,{"pid":2018,
    "nombre":"gvfsd-metadata",
    "pidPadre":974
    }
    ,{"pid":4392,
    "nombre":"snap",
    "pidPadre":974
    }
    ,{"pid":4616,
    "nombre":"chrome_crashpad",
    "pidPadre":974
    }
    ,{"pid":4487,
    "nombre":"code",
    "pidPadre":974
    }
    ,{"pid":18695,
    "nombre":"nautilus",
    "pidPadre":974
    }
    ,{"pid":18814,
    "nombre":"evince",
    "pidPadre":974
    }
    ,{"pid":18823,
    "nombre":"evinced",
    "pidPadre":974
    }
    ,{"pid":20488,
    "nombre":"gnome-terminal",
    "pidPadre":974
    }
    ,{"pid":20494,
    "nombre":"gnome-terminal-",
    "pidPadre":974
    }
    ,{"pid":59927,
    "nombre":"gnome-terminal",
    "pidPadre":974
    }
    
    ]}
    ,{"pid":983,
    "nombre":"(sd-pam)",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":991,
    "nombre":"pipewire",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":992,
    "nombre":"pipewire-media-",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":993,
    "nombre":"pulseaudio",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1009,
    "nombre":"gnome-keyring-d",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1013,
    "nombre":"rtkit-daemon",
    "usuario": 116,
    "hijo":[
    
    ]}
    ,{"pid":1018,
    "nombre":"gdm-x-session",
    "usuario": 1000,
    "hijo":[
    {"pid":1020,
    "nombre":"Xorg",
    "pidPadre":1018
    }
    ,{"pid":1087,
    "nombre":"gnome-session-b",
    "pidPadre":1018
    }
    
    ]}
    ,{"pid":1020,
    "nombre":"Xorg",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1023,
    "nombre":"dbus-daemon",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1034,
    "nombre":"xdg-document-po",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1037,
    "nombre":"xdg-permission-",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1043,
    "nombre":"fusermount3",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1087,
    "nombre":"gnome-session-b",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1100,
    "nombre":"krfcommd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":1192,
    "nombre":"at-spi-bus-laun",
    "usuario": 1000,
    "hijo":[
    {"pid":1214,
    "nombre":"dbus-daemon",
    "pidPadre":1192
    }
    
    ]}
    ,{"pid":1214,
    "nombre":"dbus-daemon",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1228,
    "nombre":"gnome-session-c",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1239,
    "nombre":"gvfsd",
    "usuario": 1000,
    "hijo":[
    {"pid":1398,
    "nombre":"gvfsd-trash",
    "pidPadre":1239
    }
    ,{"pid":24271,
    "nombre":"gvfsd-network",
    "pidPadre":1239
    }
    ,{"pid":24287,
    "nombre":"gvfsd-dnssd",
    "pidPadre":1239
    }
    ,{"pid":97243,
    "nombre":"gvfsd-http",
    "pidPadre":1239
    }
    
    ]}
    ,{"pid":1247,
    "nombre":"gvfsd-fuse",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1249,
    "nombre":"gnome-session-b",
    "usuario": 1000,
    "hijo":[
    {"pid":1467,
    "nombre":"evolution-alarm",
    "pidPadre":1249
    }
    ,{"pid":1514,
    "nombre":"gsd-disk-utilit",
    "pidPadre":1249
    }
    ,{"pid":5292,
    "nombre":"update-notifier",
    "pidPadre":1249
    }
    
    ]}
    ,{"pid":1275,
    "nombre":"gnome-shell",
    "usuario": 1000,
    "hijo":[
    {"pid":4091,
    "nombre":"firefox",
    "pidPadre":1275
    }
    ,{"pid":38164,
    "nombre":"gjs",
    "pidPadre":1275
    }
    
    ]}
    ,{"pid":1306,
    "nombre":"gnome-shell-cal",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1314,
    "nombre":"evolution-sourc",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1316,
    "nombre":"upowerd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":1320,
    "nombre":"geoclue",
    "usuario": 123,
    "hijo":[
    
    ]}
    ,{"pid":1322,
    "nombre":"dconf-service",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1329,
    "nombre":"goa-daemon",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1331,
    "nombre":"gvfs-udisks2-vo",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1337,
    "nombre":"evolution-calen",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1343,
    "nombre":"gvfs-gphoto2-vo",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1348,
    "nombre":"gvfs-goa-volume",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1357,
    "nombre":"goa-identity-se",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1359,
    "nombre":"gvfs-mtp-volume",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1371,
    "nombre":"gvfs-afc-volume",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1378,
    "nombre":"evolution-addre",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1388,
    "nombre":"packagekitd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":1398,
    "nombre":"gvfsd-trash",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1411,
    "nombre":"gjs",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1413,
    "nombre":"at-spi2-registr",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1429,
    "nombre":"xdg-desktop-por",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1434,
    "nombre":"sh",
    "usuario": 1000,
    "hijo":[
    {"pid":1438,
    "nombre":"ibus-daemon",
    "pidPadre":1434
    }
    
    ]}
    ,{"pid":1435,
    "nombre":"gsd-a11y-settin",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1438,
    "nombre":"ibus-daemon",
    "usuario": 1000,
    "hijo":[
    {"pid":1484,
    "nombre":"ibus-memconf",
    "pidPadre":1438
    }
    ,{"pid":1489,
    "nombre":"ibus-extension-",
    "pidPadre":1438
    }
    ,{"pid":1727,
    "nombre":"ibus-engine-sim",
    "pidPadre":1438
    }
    
    ]}
    ,{"pid":1439,
    "nombre":"gsd-color",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1443,
    "nombre":"gsd-datetime",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1446,
    "nombre":"gsd-housekeepin",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1448,
    "nombre":"gsd-keyboard",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1449,
    "nombre":"gsd-media-keys",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1450,
    "nombre":"gsd-power",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1451,
    "nombre":"gsd-print-notif",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1454,
    "nombre":"gsd-rfkill",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1456,
    "nombre":"gsd-screensaver",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1457,
    "nombre":"gsd-sharing",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1461,
    "nombre":"gsd-smartcard",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1464,
    "nombre":"gsd-sound",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1466,
    "nombre":"gsd-wacom",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1467,
    "nombre":"evolution-alarm",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1469,
    "nombre":"gsd-xsettings",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1484,
    "nombre":"ibus-memconf",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1489,
    "nombre":"ibus-extension-",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1497,
    "nombre":"ibus-x11",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1499,
    "nombre":"xdg-desktop-por",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1505,
    "nombre":"ibus-portal",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1514,
    "nombre":"gsd-disk-utilit",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1540,
    "nombre":"snap-store",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1600,
    "nombre":"colord",
    "usuario": 122,
    "hijo":[
    
    ]}
    ,{"pid":1667,
    "nombre":"gjs",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1721,
    "nombre":"gsd-printer",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1723,
    "nombre":"tracker-miner-f",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1727,
    "nombre":"ibus-engine-sim",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1789,
    "nombre":"xdg-desktop-por",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":1828,
    "nombre":"snapd-desktop-i",
    "usuario": 1000,
    "hijo":[
    {"pid":1914,
    "nombre":"snapd-desktop-i",
    "pidPadre":1828
    }
    
    ]}
    ,{"pid":1914,
    "nombre":"snapd-desktop-i",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":2018,
    "nombre":"gvfsd-metadata",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":2078,
    "nombre":"cups-browsed",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":2116,
    "nombre":"dockerd",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":2119,
    "nombre":"kerneloops",
    "usuario": 113,
    "hijo":[
    
    ]}
    ,{"pid":2121,
    "nombre":"kerneloops",
    "usuario": 113,
    "hijo":[
    
    ]}
    ,{"pid":4091,
    "nombre":"firefox",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4268,
    "nombre":"Socket Process",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4344,
    "nombre":"Privileged Cont",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4392,
    "nombre":"snap",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4483,
    "nombre":"WebExtensions",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4487,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    {"pid":4501,
    "nombre":"code",
    "pidPadre":4487
    }
    ,{"pid":4511,
    "nombre":"code",
    "pidPadre":4487
    }
    
    ]}
    ,{"pid":4501,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4511,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    {"pid":4803,
    "nombre":"code",
    "pidPadre":4511
    }
    ,{"pid":98832,
    "nombre":"code",
    "pidPadre":4511
    }
    
    ]}
    ,{"pid":4616,
    "nombre":"chrome_crashpad",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4693,
    "nombre":"Utility Process",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4718,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4741,
    "nombre":"Web Content",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4790,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4803,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4845,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    {"pid":4907,
    "nombre":"bash",
    "pidPadre":4845
    }
    ,{"pid":4914,
    "nombre":"bash",
    "pidPadre":4845
    }
    ,{"pid":94833,
    "nombre":"bash",
    "pidPadre":4845
    }
    ,{"pid":103899,
    "nombre":"bash",
    "pidPadre":4845
    }
    
    ]}
    ,{"pid":4846,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    {"pid":4957,
    "nombre":"gopls",
    "pidPadre":4846
    }
    ,{"pid":5715,
    "nombre":"code",
    "pidPadre":4846
    }
    ,{"pid":5716,
    "nombre":"code",
    "pidPadre":4846
    }
    ,{"pid":7217,
    "nombre":"code",
    "pidPadre":4846
    }
    ,{"pid":94728,
    "nombre":"code",
    "pidPadre":4846
    }
    ,{"pid":94729,
    "nombre":"code",
    "pidPadre":4846
    }
    
    ]}
    ,{"pid":4865,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4866,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":4907,
    "nombre":"bash",
    "usuario": 1000,
    "hijo":[
    {"pid":56860,
    "nombre":"npm start",
    "pidPadre":4907
    }
    
    ]}
    ,{"pid":4914,
    "nombre":"bash",
    "usuario": 1000,
    "hijo":[
    {"pid":90090,
    "nombre":"go",
    "pidPadre":4914
    }
    
    ]}
    ,{"pid":4957,
    "nombre":"gopls",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":5292,
    "nombre":"update-notifier",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":5715,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":5716,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    {"pid":5734,
    "nombre":"code",
    "pidPadre":5716
    }
    
    ]}
    ,{"pid":5734,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":7217,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":12577,
    "nombre":"Isolated Web Co",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":12738,
    "nombre":"Isolated Web Co",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":18695,
    "nombre":"nautilus",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":18814,
    "nombre":"evince",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":18823,
    "nombre":"evinced",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":20488,
    "nombre":"gnome-terminal",
    "usuario": 1000,
    "hijo":[
    {"pid":20491,
    "nombre":"gnome-terminal.",
    "pidPadre":20488
    }
    
    ]}
    ,{"pid":20491,
    "nombre":"gnome-terminal.",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":20494,
    "nombre":"gnome-terminal-",
    "usuario": 1000,
    "hijo":[
    {"pid":20517,
    "nombre":"bash",
    "pidPadre":20494
    }
    ,{"pid":59937,
    "nombre":"bash",
    "pidPadre":20494
    }
    
    ]}
    ,{"pid":20517,
    "nombre":"bash",
    "usuario": 1000,
    "hijo":[
    {"pid":73135,
    "nombre":"docker",
    "pidPadre":20517
    }
    
    ]}
    ,{"pid":22657,
    "nombre":"Isolated Web Co",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":22665,
    "nombre":"kworker/u33:1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":23135,
    "nombre":"RDD Process",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":23495,
    "nombre":"Isolated Web Co",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":24271,
    "nombre":"gvfsd-network",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":24287,
    "nombre":"gvfsd-dnssd",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":38164,
    "nombre":"gjs",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":54969,
    "nombre":"Isolated Web Co",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":55095,
    "nombre":"Isolated Web Co",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":55207,
    "nombre":"Isolated Web Co",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":55775,
    "nombre":"Isolated Web Co",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":56860,
    "nombre":"npm start",
    "usuario": 1000,
    "hijo":[
    {"pid":56871,
    "nombre":"sh",
    "pidPadre":56860
    }
    
    ]}
    ,{"pid":56871,
    "nombre":"sh",
    "usuario": 1000,
    "hijo":[
    {"pid":56872,
    "nombre":"node",
    "pidPadre":56871
    }
    
    ]}
    ,{"pid":56872,
    "nombre":"node",
    "usuario": 1000,
    "hijo":[
    {"pid":56879,
    "nombre":"node",
    "pidPadre":56872
    }
    
    ]}
    ,{"pid":56879,
    "nombre":"node",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":59927,
    "nombre":"gnome-terminal",
    "usuario": 1000,
    "hijo":[
    {"pid":59930,
    "nombre":"gnome-terminal.",
    "pidPadre":59927
    }
    
    ]}
    ,{"pid":59930,
    "nombre":"gnome-terminal.",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":59937,
    "nombre":"bash",
    "usuario": 1000,
    "hijo":[
    {"pid":128000,
    "nombre":"cat",
    "pidPadre":59937
    }
    
    ]}
    ,{"pid":73131,
    "nombre":"kworker/3:2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":73135,
    "nombre":"docker",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":73155,
    "nombre":"docker-compose",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":73208,
    "nombre":"docker-proxy",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":73215,
    "nombre":"docker-proxy",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":73232,
    "nombre":"containerd-shim",
    "usuario": 0,
    "hijo":[
    {"pid":73253,
    "nombre":"mysqld",
    "pidPadre":73232
    }
    
    ]}
    ,{"pid":73253,
    "nombre":"mysqld",
    "usuario": 999,
    "hijo":[
    
    ]}
    ,{"pid":76546,
    "nombre":"kworker/5:1H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":77437,
    "nombre":"kworker/u32:5",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":77568,
    "nombre":"kworker/4:0H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":77591,
    "nombre":"kworker/1:1H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":77599,
    "nombre":"kworker/2:0H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":81175,
    "nombre":"kworker/3:0H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":88088,
    "nombre":"kworker/0:1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":89333,
    "nombre":"kworker/1:0H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":89734,
    "nombre":"kworker/7:2H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":89924,
    "nombre":"kworker/2:1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":90090,
    "nombre":"go",
    "usuario": 1000,
    "hijo":[
    {"pid":90204,
    "nombre":"backend",
    "pidPadre":90090
    }
    
    ]}
    ,{"pid":90204,
    "nombre":"backend",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":92909,
    "nombre":"kworker/6:0H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":93058,
    "nombre":"kworker/7:1H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":93417,
    "nombre":"kworker/0:2H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":93600,
    "nombre":"kworker/4:1H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":94056,
    "nombre":"kworker/5:0H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":94174,
    "nombre":"kworker/1:2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":94694,
    "nombre":"kworker/5:2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":94728,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":94729,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":94833,
    "nombre":"bash",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":97243,
    "nombre":"gvfsd-http",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":97716,
    "nombre":"kworker/4:2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":97722,
    "nombre":"kworker/1:1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":97910,
    "nombre":"Isolated Web Co",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":98216,
    "nombre":"Isolated Web Co",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":98343,
    "nombre":"Web Content",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":98832,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":98839,
    "nombre":"kworker/6:2H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":98862,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":98873,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    {"pid":99022,
    "nombre":"code",
    "pidPadre":98873
    }
    ,{"pid":99023,
    "nombre":"code",
    "pidPadre":98873
    }
    
    ]}
    ,{"pid":99022,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":99023,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    {"pid":99044,
    "nombre":"code",
    "pidPadre":99023
    }
    
    ]}
    ,{"pid":99044,
    "nombre":"code",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":102404,
    "nombre":"kworker/u32:0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":103899,
    "nombre":"bash",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":105180,
    "nombre":"kworker/6:1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":111000,
    "nombre":"Web Content",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":111064,
    "nombre":"Web Content",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":113947,
    "nombre":"kworker/2:1H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":113949,
    "nombre":"kworker/3:1H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":114066,
    "nombre":"kworker/3:0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":114425,
    "nombre":"kworker/u33:0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":114829,
    "nombre":"kworker/7:2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":118435,
    "nombre":"kworker/u32:2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":119187,
    "nombre":"kworker/2:0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":120121,
    "nombre":"kworker/7:1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":120438,
    "nombre":"kworker/0:0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":123938,
    "nombre":"kworker/5:0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":124288,
    "nombre":"kworker/6:0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":124581,
    "nombre":"kworker/u32:1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":126579,
    "nombre":"kworker/5:2H",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":126646,
    "nombre":"kworker/7:0",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":127076,
    "nombre":"kworker/6:2",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":127276,
    "nombre":"kworker/5:1",
    "usuario": 0,
    "hijo":[
    
    ]}
    ,{"pid":127995,
    "nombre":"mpstat",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":127998,
    "nombre":"mpstat",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ,{"pid":128000,
    "nombre":"cat",
    "usuario": 1000,
    "hijo":[
    
    ]}
    ]
    

function graficarArbol(pid,procesos) {
    const dot = ['digraph G {\nbgcolor="transparent" node [style=filled]\n; edge [];'];

    function agregarNodos(proceso) {
      dot.push(`"${proceso.pid}" [label="${proceso.nombre}\npid: ${proceso.pid}"]`);
      if (proceso.hijo) {
        proceso.hijo.forEach(hijo => {
            agregarNodos(hijo);
          });
      }
    }
  
    function agregarConexiones(proceso) {
        if (proceso.hijo) {
            proceso.hijo.forEach(hijo => {
                dot.push(`"${proceso.pid}" -> "${hijo.pid}"`);
                agregarConexiones(hijo); // Llamada recursiva para manejar los hijos de cada hijo
              });
        }

    }
  
    procesos.forEach(proceso => {
        console.log(proceso.pid);
        console.log(pid);
        if (proceso.pid == pid) {
            agregarNodos(proceso);
            agregarConexiones(proceso);
        }
    });
  
    dot.push('}');
    console.log(dot.join('\n'));
    return dot.join('\n');
  }


function ProcessTree() {
    const [procesoSeleccionado, setProcesoSeleccionado] = useState(null);
  
    const handleProcesoChange = (event) => {
      const selectedProcess = event.target.value;
      setProcesoSeleccionado(selectedProcess);
    };
  
    return (
      <div className="container">
      <div className="navbar2">
        <h1 className="custom-color2">PROCESS TREE</h1>
      </div>
      <div>

      <select onChange={handleProcesoChange}>
          <option value="">Selecciona un proceso</option>
          {/* Mapear procesos para crear opciones para el selector */}
          {procesos.map((proceso, index) => (
            <option key={index} value={proceso.pid}>
              {proceso.pid} - {proceso.nombre}
            </option>
          ))}
        </select>

      </div>
      <div className='graphics-content'>
      <div>
        
  
        {procesoSeleccionado && (
          <Graph
            dot={graficarArbol(procesoSeleccionado,procesos)}
            options={{zoom:true, height: 300, width: 700 }}
          />
        )}
      </div>


      </div>
    </div>
      
    );
  }
  
  export default ProcessTree;