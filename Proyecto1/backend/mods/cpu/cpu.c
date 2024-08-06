#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/mm.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>
#include <linux/seq_file.h>
#include <linux/fs.h>
#include <linux/sched/loadavg.h>

struct task_struct *task;
struct task_struct *task_child;
struct list_head *list;

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Josue Zuleta");
MODULE_DESCRIPTION("Informacion del CPU");
MODULE_VERSION("1.0");

static int escribir_a_proc(struct seq_file *file_proc, void *v){

    seq_printf(file_proc, "{ \"cpu_usage\": %lu.%02lu, \"processes\": [" , LOAD_INT(avenrun[0]), LOAD_FRAC(avenrun[0]));

    int b = 0;
    unsigned long rss;

    for_each_process(task)
    {
        if (task->mm){
            rss = get_mm_rss(task->mm) << PAGE_SHIFT;
        }else{
            rss = 0;
        }
        if (b == 0){
            seq_printf(file_proc, "{");
            b = 1;
        }else{
            seq_printf(file_proc, ",{");
        }
        seq_printf(file_proc, "\"pid\":%d,\n", task->pid);
        seq_printf(file_proc, "\"name\":\"%s\",\n", task->comm);
        seq_printf(file_proc, "\"child\":[\n");
        int a = 0;
        list_for_each(list, &(task->children))
        {
            task_child = list_entry(list, struct task_struct, sibling);
            if (a != 0)
            {
                seq_printf(file_proc, ",{");
                seq_printf(file_proc, "\"pid\":%d,\n", task_child->pid);
                seq_printf(file_proc, "\"name\":\"%s\",\n", task_child->comm);
                seq_printf(file_proc, "\"pidPadre\":%d\n", task->pid);
                seq_printf(file_proc, "}\n");
            }
            else
            {
                seq_printf(file_proc, "{");
                seq_printf(file_proc, "\"pid\":%d,\n", task_child->pid);
                seq_printf(file_proc, "\"name\":\"%s\",\n", task_child->comm);
                seq_printf(file_proc, "\"pidPadre\":%d\n", task->pid);
                seq_printf(file_proc, "}\n");
                a = 1;
            }
        }
        a = 0;
        seq_printf(file_proc, "\n]}");
    }
    b = 0;
    seq_printf(file_proc, "]}\n");
    return 0;
}

static int abrir_aproc(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_a_proc, NULL);
}

static const struct proc_ops archivo_operaciones = {
    .proc_open = abrir_aproc,
    .proc_read = seq_read,
};

static int __init modulo_init(void)
{
    proc_create("cpu_so1_1s2024", 0, NULL, &archivo_operaciones);
    printk(KERN_INFO "Modulo CPU montado\n");
    return 0;
}

static void __exit modulo_cleanup(void)
{
    remove_proc_entry("cpu_so1_1s2024", NULL);
    printk(KERN_INFO "Modulo CPU eliminado \n");
}

module_init(modulo_init);
module_exit(modulo_cleanup);
