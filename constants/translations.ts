import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const en = {
    tracker_screen:{
        layout:{
            tracker: 'Tracker',
            tasks: 'Tasks',
            tags: 'Tags',
            insights: 'Insights',
            home: 'Home',
        },
        index:{
            title: 'Logs',
            no_logs: 'No logs found',
            questions:'What did you do?',
            tags: 'Tags',
            add_tag: 'Add tag',
            save_btn: 'Save',
            oops_alert: 'Oops!',
            error_alert: 'Error',
            success_alert: 'Success',
            no_time: 'No time to log',
            no_task: 'Please select a task',
            task_create_failed: 'Failed to create task',
            log_create_failed: 'Failed to create timelog',
            log_create_success: 'Time log created successfully',
            tag_create_failed: 'Failed to create timelog tag',
            time_log: 'Time Log',
        },
        poromodo:{
            break_title: 'Focus Session Completed',
            break_msg: 'Time to take a break!',
            break_complete: 'Break Session Completed',
            break_complete_msg: 'Time to focus!',
            continue: 'Continue',
            end_pomodoro: 'End Pomodoro',
            stop_pomodoro: 'Leave Pomodoro',
            stop_pomodoro_msg: 'This will stop the pomodoro timer.',
            yes: 'Yes',
            no: 'No',
            break: 'Break',
            pause: 'Pause',
        },
    },
    tag_screen:{
        layout:{
            title: 'Tags',
            add_tags: 'Add Tag'
        },
        index: {
            title: 'Tags',
        },
        add:{
            title: 'Add Tag',
            edit_tag: 'Edit Tag',
            create_tag: 'Create New Tag',
            tag_name: 'Tag Name',
            tag_color: 'Tag Color',
            name_required: 'Name is required',
            color_required: 'Color is required',
            save_btn: 'Save',
            delete_btn: 'Delete',
            delete_alert: 'Delete Tag',
            delete_alert_msg: 'Are you sure you want to delete this tag?',
            cancel: 'Cancel',
            delete: 'Delete Tag',
            tag_create_failed: 'Failed to create tag',
            tag_create_success: 'Tag created successfully',
            tag_update_failed: 'Failed to update tag',
            tag_update_success: 'Tag updated successfully',
            tag_delete_failed: 'Failed to delete tag',
            tag_delete_success: 'Tag deleted successfully',
            place_holder: 'E.g. work, personal, study, etc.',
        }
    },

    task_screen:{
        index:{
            title: 'Tasks',
            all_tasks: 'All Tasks',
            edit: 'Edit Task',
            add: 'Add Task',
        },
        add:{
            desc_alert: 'Task description is required',
            name_placeholder: 'Enter Task Name',
            save: 'Save',
        },
        edit:{
            delete_alert_title: 'Delete Task',
            delete_alert_msg: 'This will delete all related time records. Are you sure you want to delete this task?',
            cancel: 'Cancel',
            delete: 'Delete',
            error: 'Error',
            error_msg: 'These time records do not belong to this task',
            ok: 'OK',
            name_placeholder: 'Enter Task Name',
            save: 'Save',
            total_time: 'Total Time Used:',
            import: 'Import Data',
            export: 'Export Data',
        }
    },
    
    insights_screen:{
        layout:{
            title: 'Insights',
        },
        index:{
            no_data: 'No data to show',
            duration: 'Duration',
            select_duration: 'Select duration to view insights',
            select_duration_label: 'Select duration to view insights',
            daily: 'Today',
            weekly: 'Weekly',
            monthly: 'Monthly',
            yearly: 'Yearly',
            all: 'All',
            all_time: 'All time',
        },
    },
    components:{
        task_card:{
            no_time: 'No time logged',
            edit: 'Edit',
        },
        tag_stat:{
            total_time: 'Total time: ',
            logs: 'logs',
            log: 'log',
        },
        time_format:{
            today: 'Today',
            monday: 'Mon',
            tuesday: 'Tue',
            wednesday: 'Wed',
            thursday: 'Thu',
            friday: 'Fri',
            saturday: 'Sat',
            sunday: 'Sun',
        }
    }
}

const vi = {
    tracker_screen:{
        layout:{
            tracker: 'Bộ Theo Dõi',
            tasks: 'Nhiệm vụ',
            tags: 'Thẻ',
            insights: 'Biểu đồ',
        },        
        index:{
            title: 'Nhật ký',
            no_logs: 'Không tìm thấy nhật ký',
            questions: 'Bạn đã làm gì?',
            tags: 'Nhãn',
            add_tag: 'Thêm nhãn',
            save_btn: 'Lưu',
            oops_alert: 'Ôh!',
            error_alert: 'Lỗi',
            success_alert: 'Thành công',
            no_time: 'Không có thời gian để ghi nhật ký',
            no_task: 'Vui lòng chọn một nhiệm vụ',
            task_create_failed: 'Tạo nhiệm vụ thất bại',
            log_create_failed: 'Tạo nhật ký thời gian thất bại',
            log_create_success: 'Tạo nhật ký thời gian thành công',
            tag_create_failed: 'Tạo thẻ nhật ký thời gian thất bại',
            time_log: 'Nhật ký thời gian',
        },
        poromodo:{
            break_title: 'Thời gian Tập Trung Kết Thúc',
            break_msg: 'Đã đến lúc nghỉ ngơi!',
            break_complete: 'Thời Gian Nghỉ Ngơi Kết Thúc',
            break_complete_msg: 'Đã đến lúc tập trung!',
            continue: 'Tiếp tục',
            end_pomodoro: 'Kết thúc Pomodoro',
            stop_pomodoro_msg: 'Dừng và kết thúc đếm thời gian pomodoro.',
            yes: 'Có',
            no: 'Không',
            break: 'Nghỉ',
            pause: 'Tạm dừng',
        },
        tags:{
            title: 'Quản lý thẻ',
            no_tags: 'Không tìm thấy thẻ',
            add_tag: 'Thêm thẻ',
            tag_name: 'Tên thẻ',
            tag_color: 'Màu sắc',
            save_btn: 'Lưu',
            tag_create_failed: 'Tạo thẻ thất bại',
            tag_create_success: 'Tạo thẻ thành công',
            tag_update_failed: 'Cập nhật thẻ thất bại',
            tag_update_success: 'Cập nhật thẻ thành công',
            tag_delete_failed: 'Xóa thẻ thất bại',
            tag_delete_success: 'Xóa thẻ thành công',
        }
    },
    tag_screen:{
        layout:{
            title: 'Thẻ',
            add_tags: 'Thêm Thẻ'
        },
        index: {
            title: 'Thẻ',
        },
        add:{
            title: 'Thêm Thẻ',
            edit_tag: 'Chỉnh Sửa Thẻ',
            create_tag: 'Tạo Thẻ Mới',
            tag_name: 'Tên Thẻ',
            tag_color: 'Màu Thẻ',
            name_required: 'Tên là bắt buộc',
            color_required: 'Màu là bắt buộc',
            save_btn: 'Lưu',
            delete_btn: 'Xóa',
            delete_alert: 'Xóa Thẻ',
            delete_alert_msg: 'Bạn có chắc chắn muốn xóa thẻ này không?',
            cancel: 'Hủy',
            delete: 'Xóa Thẻ',
            tag_create_failed: 'Tạo thẻ thất bại',
            tag_create_success: 'Tạo thẻ thành công',
            tag_update_failed: 'Cập nhật thẻ thất bại',
            tag_update_success: 'Cập nhật thẻ thành công',
            tag_delete_failed: 'Xóa thẻ thất bại',
            tag_delete_success: 'Xóa thẻ thành công',
            place_holder: 'Ví dụ: công việc, cá nhân, học tập, v.v.',
        }
    },
    task_screen:{
        
    },
    insights_screen:{
        layout:{
            title: 'Thông tin chi tiết',
        },
        index:{
            no_data: 'Không có dữ liệu để hiển thị',
            duration: 'Thời gian',
            select_duration: 'Chọn thời gian để xem thông tin chi tiết',
            select_duration_label: 'Chọn thời gian để xem thông tin chi tiết',
            daily: 'Hôm nay',
            weekly: 'Hàng tuần',
            monthly: 'Hàng tháng',
            yearly: 'Hàng năm',
            all: 'Tất cả',
            all_time: 'Toàn thời gian',
        },
    },
    components:{
        task_card:{
            no_time: 'Không có thời gian ghi nhật ký',
            edit: 'Chỉnh sửa',
        },
        tag_stat:{
            total_time: 'Tổng thời gian: ',
            logs: 'nhật ký',
            log: 'nhật ký',
        },
        time_format:{
            today: 'Hôm nay',
            monday: 'Thứ Hai',
            tuesday: 'Thứ Ba',
            wednesday: 'Thứ Tư',
            thursday: 'Thứ Năm',
            friday: 'Thứ Sáu',
            saturday: 'Thứ Bảy',
            sunday: 'Chủ Nhật',
        }
    }
}

const fr = {
    tracker_screen:{
        layout:{
            tracker: 'Tracker',
            tasks: 'Tâches',
            tags: 'Tags',
            insights: 'Aperçus',
            home: 'Accueil',
        },
        index:{
            title: 'Journaux',
            no_logs: 'Aucun journal trouvé',
            questions: 'Qu\'avez-vous fait?',
            tags: 'Tags',
            add_tag: 'Ajouter un tag',
            save_btn: 'Enregistrer',
            oops_alert: 'Oups!',
            error_alert: 'Erreur',
            success_alert: 'Succès',
            no_time: 'Pas de temps à enregistrer',
            no_task: 'Veuillez sélectionner une tâche',
            task_create_failed: 'Échec de la création de la tâche',
            log_create_failed: 'Échec de la création du journal de temps',
            log_create_success: 'Journal de temps créé avec succès',
            tag_create_failed: 'Échec de la création du tag du journal de temps',
            time_log: 'Journal de Temps',
        },
        poromodo:{
            break_title: 'Session de Concentration Terminée',
            break_msg: 'Il est temps de faire une pause!',
            break_complete: 'Session de Pause Terminée',
            break_complete_msg: 'Il est temps de se concentrer!',
            continue: 'Continuer',
            end_pomodoro: 'Terminer Pomodoro',
            stop_pomodoro: 'Quitter Pomodoro',
            stop_pomodoro_msg: 'Cela arrêtera le minuteur Pomodoro.',
            yes: 'Oui',
            no: 'Non',
            break: 'Pause',
            pause: 'Pause',
        },
    },
    tag_screen:{
        layout:{
            title: 'Tags',
            add_tags: 'Ajouter un Tag'
        },
        index: {
            title: 'Tags',
        },
        add:{
            title: 'Ajouter un Tag',
            edit_tag: 'Modifier le Tag',
            create_tag: 'Créer un Nouveau Tag',
            tag_name: 'Nom du Tag',
            tag_color: 'Couleur du Tag',
            name_required: 'Le nom est requis',
            color_required: 'La couleur est requise',
            save_btn: 'Enregistrer',
            delete_btn: 'Supprimer',
            delete_alert: 'Supprimer le Tag',
            delete_alert_msg: 'Êtes-vous sûr de vouloir supprimer ce tag?',
            cancel: 'Annuler',
            delete: 'Supprimer le Tag',
            tag_create_failed: 'Échec de la création du tag',
            tag_create_success: 'Tag créé avec succès',
            tag_update_failed: 'Échec de la mise à jour du tag',
            tag_update_success: 'Tag mis à jour avec succès',
            tag_delete_failed: 'Échec de la suppression du tag',
            tag_delete_success: 'Tag supprimé avec succès',
            place_holder: 'Ex. travail, personnel, étude, etc.',
        }
    },
    task_screen:{
        index:{
            title: 'Tâches',
            all_tasks: 'Toutes les Tâches',
            edit: 'Modifier la Tâche',
            add: 'Ajouter une Tâche',
        },
        add:{
            desc_alert: 'La description de la tâche est requise',
            name_placeholder: 'Entrer le Nom de la Tâche',
            save: 'Enregistrer',
        },
        edit:{
            delete_alert_title: 'Supprimer la Tâche',
            delete_alert_msg: 'Cela supprimera les journaux de temps associés. Êtes-vous sûr de vouloir supprimer cette tâche?',
            cancel: 'Annuler',
            delete: 'Supprimer',
            error: 'Erreur',
            error_msg: 'Les journaux de temps ne sont pas pour cette tâche',
            ok: 'Ok',
            name_placeholder: 'Entrer le Nom de la Tâche',
            save: 'Enregistrer',
            total_time: 'Temps Total Utilisé:',
            import: 'Importer des Données',
            export: 'Exporter des Données',
        }
    },
    insights_screen:{
        layout:{
            title: 'Aperçus',
        },
        index:{
            no_data: 'Aucune donnée à afficher',
            duration: 'Durée',
            select_duration: 'Sélectionner la durée pour voir les aperçus',
            select_duration_label: 'Sélectionner la durée pour voir les aperçus',
            daily: 'Aujourd\'hui',
            weekly: 'Hebdomadaire',
            monthly: 'Mensuel',
            yearly: 'Annuel',
            all: 'Tous',
            all_time: 'Tout le temps',
        },
    },
    components:{
        task_card:{
            no_time: 'Aucun temps enregistré',
            edit: 'Modifier',
        },
        tag_stat:{
            total_time: 'Temps total: ',
            logs: 'journaux',
            log: 'journal',
        },
        time_format:{
            today: 'Aujourd\'hui',
            monday: 'Lun',
            tuesday: 'Mar',
            wednesday: 'Mer',
            thursday: 'Jeu',
            friday: 'Ven',
            saturday: 'Sam',
            sunday: 'Dim',
        }
    }
}

const hi = {
    tracker_screen:{
        layout:{
            tracker: 'ट्रैकर',
            tasks: 'कार्य',
            tags: 'टैग्स',
            insights: 'अवलोकन',
            home: 'होम',
        },
        index:{
            title: 'लॉग्स',
            no_logs: 'कोई लॉग नहीं मिला',
            questions: 'आपने क्या किया?',
            tags: 'टैग्स',
            add_tag: 'टैग जोड़ें',
            save_btn: 'सहेजें',
            oops_alert: 'उफ़!',
            error_alert: 'त्रुटि',
            success_alert: 'सफलता',
            no_time: 'लॉग करने का समय नहीं',
            no_task: 'कृपया एक कार्य चुनें',
            task_create_failed: 'कार्य बनाने में विफल',
            log_create_failed: 'समय लॉग बनाने में विफल',
            log_create_success: 'समय लॉग सफलतापूर्वक बनाया गया',
            tag_create_failed: 'समय लॉग टैग बनाने में विफल',
            time_log: 'समय लॉग',
        },
        poromodo:{
            break_title: 'फोकस सत्र पूरा हुआ',
            break_msg: 'ब्रेक लेने का समय!',
            break_complete: 'ब्रेक सत्र पूरा हुआ',
            break_complete_msg: 'फोकस करने का समय!',
            continue: 'जारी रखें',
            end_pomodoro: 'पोमोडोरो समाप्त करें',
            stop_pomodoro: 'पोमोडोरो छोड़ें',
            stop_pomodoro_msg: 'यह पोमोडोरो टाइमर को रोक देगा।',
            yes: 'हाँ',
            no: 'नहीं',
            break: 'ब्रेक',
            pause: 'विराम',
        },
    },
    tag_screen:{
        layout:{
            title: 'टैग्स',
            add_tags: 'टैग जोड़ें'
        },
        index: {
            title: 'टैग्स',
        },
        add:{
            title: 'टैग जोड़ें',
            edit_tag: 'टैग संपादित करें',
            create_tag: 'नया टैग बनाएं',
            tag_name: 'टैग का नाम',
            tag_color: 'टैग का रंग',
            name_required: 'नाम आवश्यक है',
            color_required: 'रंग आवश्यक है',
            save_btn: 'सहेजें',
            delete_btn: 'हटाएं',
            delete_alert: 'टैग हटाएं',
            delete_alert_msg: 'क्या आप इस टैग को हटाना चाहते हैं?',
            cancel: 'रद्द करें',
            delete: 'टैग हटाएं',
            tag_create_failed: 'टैग बनाने में विफल',
            tag_create_success: 'टैग सफलतापूर्वक बनाया गया',
            tag_update_failed: 'टैग अपडेट करने में विफल',
            tag_update_success: 'टैग सफलतापूर्वक अपडेट किया गया',
            tag_delete_failed: 'टैग हटाने में विफल',
            tag_delete_success: 'टैग सफलतापूर्वक हटाया गया',
            place_holder: 'जैसे काम, व्यक्तिगत, अध्ययन, आदि।',
        }
    },
    task_screen:{
        index:{
            title: 'कार्य',
            all_tasks: 'सभी कार्य',
            edit: 'कार्य संपादित करें',
            add: 'कार्य जोड़ें',
        },
        add:{
            desc_alert: 'कार्य विवरण आवश्यक है',
            name_placeholder: 'कार्य का नाम दर्ज करें',
            save: 'सहेजें',
        },
        edit:{
            delete_alert_title: 'कार्य हटाएं',
            delete_alert_msg: 'यह संबंधित समय लॉग्स को हटा देगा, क्या आप वाकई इस कार्य को हटाना चाहते हैं?',
            cancel: 'रद्द करें',
            delete: 'हटाएं',
            error: 'त्रुटि',
            error_msg: 'समय लॉग्स इस कार्य के लिए नहीं हैं',
            ok: 'ठीक है',
            name_placeholder: 'कार्य का नाम दर्ज करें',
            save: 'सहेजें',
            total_time: 'कुल उपयोग का समय:',
            import: 'डेटा आयात करें',
            export: 'डेटा निर्यात करें',
        }
    },
    insights_screen:{
        layout:{
            title: 'अवलोकन',
        },
        index:{
            no_data: 'दिखाने के लिए कोई डेटा नहीं है',
            duration: 'अवधि',
            select_duration: 'अवलोकन देखने के लिए अवधि चुनें',
            select_duration_label: 'अवलोकन देखने के लिए अवधि चुनें',
            daily: 'आज',
            weekly: 'साप्ताहिक',
            monthly: 'मासिक',
            yearly: 'वार्षिक',
            all: 'सभी',
            all_time: 'सभी समय',
        },
    },
    components:{
        task_card:{
            no_time: 'कोई समय लॉग नहीं किया गया',
            edit: 'संपादित करें',
        },
        tag_stat:{
            total_time: 'कुल समय: ',
            logs: 'लॉग्स',
            log: 'लॉग',
        },
        time_format:{
            today: 'आज',
            monday: 'सोम',
            tuesday: 'मंगल',
            wednesday: 'बुध',
            thursday: 'गुरु',
            friday: 'शुक्र',
            saturday: 'शनि',
            sunday: 'रवि',
        }
    }
}

const es = {
    tracker_screen:{
        layout:{
            tracker: 'Rastreador',
            tasks: 'Tareas',
            tags: 'Etiquetas',
            insights: 'Perspectivas',
            home: 'Inicio',
        },
        index:{
            title: 'Registros',
            no_logs: 'No se encontraron registros',
            questions: '¿Qué hiciste?',
            tags: 'Etiquetas',
            add_tag: 'Añadir etiqueta',
            save_btn: 'Guardar',
            oops_alert: '¡Vaya!',
            error_alert: 'Error',
            success_alert: 'Éxito',
            no_time: 'No hay tiempo para registrar',
            no_task: 'Por favor selecciona una tarea',
            task_create_failed: 'No se pudo crear la tarea',
            log_create_failed: 'No se pudo crear el registro de tiempo',
            log_create_success: 'Registro de tiempo creado con éxito',
            tag_create_failed: 'No se pudo crear la etiqueta del registro de tiempo',
            time_log: 'Registro de Tiempo',
        },
        poromodo:{
            break_title: 'Sesión de Enfoque Completada',
            break_msg: '¡Hora de tomar un descanso!',
            break_complete: 'Sesión de Descanso Completada',
            break_complete_msg: '¡Hora de enfocarse!',
            continue: 'Continuar',
            end_pomodoro: 'Terminar Pomodoro',
            stop_pomodoro: 'Salir de Pomodoro',
            stop_pomodoro_msg: 'Esto detendrá el temporizador Pomodoro.',
            yes: 'Sí',
            no: 'No',
            break: 'Descanso',
            pause: 'Pausa',
        },
    },
    tag_screen:{
        layout:{
            title: 'Etiquetas',
            add_tags: 'Añadir Etiqueta'
        },
        index: {
            title: 'Etiquetas',
        },
        add:{
            title: 'Añadir Etiqueta',
            edit_tag: 'Editar Etiqueta',
            create_tag: 'Crear Nueva Etiqueta',
            tag_name: 'Nombre de la Etiqueta',
            tag_color: 'Color de la Etiqueta',
            name_required: 'El nombre es obligatorio',
            color_required: 'El color es obligatorio',
            save_btn: 'Guardar',
            delete_btn: 'Eliminar',
            delete_alert: 'Eliminar Etiqueta',
            delete_alert_msg: '¿Estás seguro de que deseas eliminar esta etiqueta?',
            cancel: 'Cancelar',
            delete: 'Eliminar Etiqueta',
            tag_create_failed: 'No se pudo crear la etiqueta',
            tag_create_success: 'Etiqueta creada con éxito',
            tag_update_failed: 'No se pudo actualizar la etiqueta',
            tag_update_success: 'Etiqueta actualizada con éxito',
            tag_delete_failed: 'No se pudo eliminar la etiqueta',
            tag_delete_success: 'Etiqueta eliminada con éxito',
            place_holder: 'Por ejemplo: trabajo, personal, estudio, etc.',
        }
    },
    task_screen:{
        index:{
            title: 'Tareas',
            all_tasks: 'Todas las Tareas',
            edit: 'Editar Tarea',
            add: 'Añadir Tarea',
        },
        add:{
            desc_alert: 'La descripción de la tarea es obligatoria',
            name_placeholder: 'Introducir Nombre de la Tarea',
            save: 'Guardar',
        },
        edit:{
            delete_alert_title: 'Eliminar Tarea',
            delete_alert_msg: 'Esto eliminará los registros de tiempo asociados. ¿Estás seguro de que deseas eliminar esta tarea?',
            cancel: 'Cancelar',
            delete: 'Eliminar',
            error: 'Error',
            error_msg: 'Los registros de tiempo no son para esta tarea',
            ok: 'Ok',
            name_placeholder: 'Introducir Nombre de la Tarea',
            save: 'Guardar',
            total_time: 'Tiempo Total Utilizado:',
            import: 'Importar Datos',
            export: 'Exportar Datos',
        }
    },
    insights_screen:{
        layout:{
            title: 'Perspectivas',
        },
        index:{
            no_data: 'No hay datos para mostrar',
            duration: 'Duración',
            select_duration: 'Seleccionar duración para ver perspectivas',
            select_duration_label: 'Seleccionar duración para ver perspectivas',
            daily: 'Hoy',
            weekly: 'Semanal',
            monthly: 'Mensual',
            yearly: 'Anual',
            all: 'Todo',
            all_time: 'Todo el tiempo',
        },
    },
    components:{
        task_card:{
            no_time: 'No hay tiempo registrado',
            edit: 'Editar',
        },
        tag_stat:{
            total_time: 'Tiempo total: ',
            logs: 'registros',
            log: 'registro',
        },
        time_format:{
            today: 'Hoy',
            monday: 'Lun',
            tuesday: 'Mar',
            wednesday: 'Mié',
            thursday: 'Jue',
            friday: 'Vie',
            saturday: 'Sáb',
            sunday: 'Dom',
        }
    }
}

const zh = {
    tracker_screen:{
        layout:{
            tracker: '跟踪器',
            tasks: '任务',
            tags: '标签',
            insights: '洞察',
            home: '主页',
        },
        index:{
            title: '日志',
            no_logs: '未找到日志',
            questions: '你做了什么？',
            tags: '标签',
            add_tag: '添加标签',
            save_btn: '保存',
            oops_alert: '哎呀！',
            error_alert: '错误',
            success_alert: '成功',
            no_time: '没有时间记录',
            no_task: '请选择一个任务',
            task_create_failed: '创建任务失败',
            log_create_failed: '创建时间日志失败',
            log_create_success: '时间日志创建成功',
            tag_create_failed: '创建标签失败',
            time_log: '时间日志',
        },
        poromodo:{
            break_title: '专注时间已完成',
            break_msg: '该休息一下了！',
            break_complete: '休息时间已完成',
            break_complete_msg: '该继续专注了！',
            continue: '继续',
            end_pomodoro: '结束番茄钟',
            stop_pomodoro: '离开番茄钟',
            stop_pomodoro_msg: '这将停止番茄钟计时器。',
            yes: '是',
            no: '否',
            break: '休息',
            pause: '暂停',
        },
    },
    tag_screen:{
        layout:{
            title: '标签',
            add_tags: '添加标签'
        },
        index: {
            title: '标签',
        },
        add:{
            title: '添加标签',
            edit_tag: '编辑标签',
            create_tag: '创建新标签',
            tag_name: '标签名称',
            tag_color: '标签颜色',
            name_required: '名称是必需的',
            color_required: '颜色是必需的',
            save_btn: '保存',
            delete_btn: '删除',
            delete_alert: '删除标签',
            delete_alert_msg: '您确定要删除此标签吗？',
            cancel: '取消',
            delete: '删除标签',
            tag_create_failed: '创建标签失败',
            tag_create_success: '标签创建成功',
            tag_update_failed: '更新标签失败',
            tag_update_success: '标签更新成功',
            tag_delete_failed: '删除标签失败',
            tag_delete_success: '标签删除成功',
            place_holder: '例如：工作、个人、学习等。',
        }
    },
    task_screen:{
        index:{
            title: '任务',
            all_tasks: '所有任务',
            edit: '编辑任务',
            add: '添加任务',
        },
        add:{
            desc_alert: '任务描述是必需的',
            name_placeholder: '输入任务名称',
            save: '保存',
        },
        edit:{
            delete_alert_title: '删除任务',
            delete_alert_msg: '这将删除相关的时间记录，您确定要删除此任务吗？',
            cancel: '取消',
            delete: '删除',
            error: '错误',
            error_msg: '这些时间记录不属于此任务',
            ok: '确定',
            name_placeholder: '输入任务名称',
            save: '保存',
            total_time: '总使用时间：',
            import: '导入数据',
            export: '导出数据',
        }
    },
    insights_screen:{
        layout:{
            title: '洞察',
        },
        index:{
            no_data: '没有数据展示',
            duration: '持续时间',
            select_duration: '选择持续时间以查看洞察',
            select_duration_label: '选择持续时间以查看洞察',
            daily: '今天',
            weekly: '每周',
            monthly: '每月',
            yearly: '每年',
            all: '全部',
            all_time: '所有时间',
        },
    },
    components:{
        task_card:{
            no_time: '没有记录时间',
            edit: '编辑',
        },
        tag_stat:{
            total_time: '总时间：',
            logs: '日志',
            log: '日志',
        },
        time_format:{
            today: '今天',
            monday: '周一',
            tuesday: '周二',
            wednesday: '周三',
            thursday: '周四',
            friday: '周五',
            saturday: '周六',
            sunday: '周日',
        }
    }
}

const ko = {
    tracker_screen:{
        layout:{
            tracker: '트래커',
            tasks: '작업',
            tags: '태그',
            insights: '통찰',
            home: '홈',
        },
        index:{
            title: '로그',
            no_logs: '로그가 없습니다',
            questions: '무엇을 했나요?',
            tags: '태그',
            add_tag: '태그 추가',
            save_btn: '저장',
            oops_alert: '앗!',
            error_alert: '오류',
            success_alert: '성공',
            no_time: '로그할 시간이 없습니다',
            no_task: '작업을 선택해 주세요',
            task_create_failed: '작업 생성 실패',
            log_create_failed: '타임 로그 생성 실패',
            log_create_success: '타임 로그 생성 성공',
            tag_create_failed: '태그 생성 실패',
            time_log: '타임 로그',
        },
        poromodo:{
            break_title: '집중 세션 완료',
            break_msg: '잠시 쉬는 시간입니다!',
            break_complete: '휴식 세션 완료',
            break_complete_msg: '집중할 시간입니다!',
            continue: '계속',
            end_pomodoro: '포모도로 종료',
            stop_pomodoro: '포모도로 종료',
            stop_pomodoro_msg: '이 작업은 포모도로 타이머를 중지합니다.',
            yes: '예',
            no: '아니요',
            break: '휴식',
            pause: '일시 중지',
        },
    },
    tag_screen:{
        layout:{
            title: '태그',
            add_tags: '태그 추가'
        },
        index: {
            title: '태그',
        },
        add:{
            title: '태그 추가',
            edit_tag: '태그 편집',
            create_tag: '새 태그 만들기',
            tag_name: '태그 이름',
            tag_color: '태그 색상',
            name_required: '이름이 필요합니다',
            color_required: '색상이 필요합니다',
            save_btn: '저장',
            delete_btn: '삭제',
            delete_alert: '태그 삭제',
            delete_alert_msg: '이 태그를 삭제하시겠습니까?',
            cancel: '취소',
            delete: '태그 삭제',
            tag_create_failed: '태그 생성 실패',
            tag_create_success: '태그 생성 성공',
            tag_update_failed: '태그 업데이트 실패',
            tag_update_success: '태그 업데이트 성공',
            tag_delete_failed: '태그 삭제 실패',
            tag_delete_success: '태그 삭제 성공',
            place_holder: '예: 업무, 개인, 학습 등',
        }
    },
    task_screen:{
        index:{
            title: '작업',
            all_tasks: '모든 작업',
            edit: '작업 편집',
            add: '작업 추가',
        },
        add:{
            desc_alert: '작업 설명이 필요합니다',
            name_placeholder: '작업 이름 입력',
            save: '저장',
        },
        edit:{
            delete_alert_title: '작업 삭제',
            delete_alert_msg: '이 작업과 관련된 시간 기록이 삭제됩니다. 이 작업을 삭제하시겠습니까?',
            cancel: '취소',
            delete: '삭제',
            error: '오류',
            error_msg: '이 시간 기록은 이 작업과 관련이 없습니다',
            ok: '확인',
            name_placeholder: '작업 이름 입력',
            save: '저장',
            total_time: '총 사용 시간:',
            import: '데이터 가져오기',
            export: '데이터 내보내기',
        }
    },
    insights_screen:{
        layout:{
            title: '통찰',
        },
        index:{
            no_data: '보여줄 데이터가 없습니다',
            duration: '지속 시간',
            select_duration: '통찰을 보려면 기간 선택',
            select_duration_label: '통찰을 보려면 기간 선택',
            daily: '오늘',
            weekly: '주간',
            monthly: '월간',
            yearly: '연간',
            all: '전체',
            all_time: '모든 시간',
        },
    },
    components:{
        task_card:{
            no_time: '로그된 시간이 없습니다',
            edit: '편집',
        },
        tag_stat:{
            total_time: '총 시간: ',
            logs: '로그',
            log: '로그',
        },
        time_format:{
            today: '오늘',
            monday: '월요일',
            tuesday: '화요일',
            wednesday: '수요일',
            thursday: '목요일',
            friday: '금요일',
            saturday: '토요일',
            sunday: '일요일',
        }
    }
}

const ja = {
    tracker_screen:{
        layout:{
            tracker: 'トラッカー',
            tasks: 'タスク',
            tags: 'タグ',
            insights: 'インサイト',
            home: 'ホーム',
        },
        index:{
            title: 'ログ',
            no_logs: 'ログが見つかりません',
            questions: '何をしましたか？',
            tags: 'タグ',
            add_tag: 'タグを追加',
            save_btn: '保存',
            oops_alert: 'おっと！',
            error_alert: 'エラー',
            success_alert: '成功',
            no_time: 'ログを記録する時間がありません',
            no_task: 'タスクを選択してください',
            task_create_failed: 'タスクの作成に失敗しました',
            log_create_failed: 'タイムログの作成に失敗しました',
            log_create_success: 'タイムログが正常に作成されました',
            tag_create_failed: 'タグの作成に失敗しました',
            time_log: 'タイムログ',
        },
        poromodo:{
            break_title: 'フォーカスセッション完了',
            break_msg: '休憩の時間です！',
            break_complete: '休憩セッション完了',
            break_complete_msg: 'フォーカスする時間です！',
            continue: '続ける',
            end_pomodoro: 'ポモドーロを終了',
            stop_pomodoro: 'ポモドーロを終了',
            stop_pomodoro_msg: 'これによりポモドーロタイマーが停止します。',
            yes: 'はい',
            no: 'いいえ',
            break: '休憩',
            pause: '一時停止',
        },
    },
    tag_screen:{
        layout:{
            title: 'タグ',
            add_tags: 'タグを追加'
        },
        index: {
            title: 'タグ',
        },
        add:{
            title: 'タグを追加',
            edit_tag: 'タグを編集',
            create_tag: '新しいタグを作成',
            tag_name: 'タグ名',
            tag_color: 'タグの色',
            name_required: '名前は必須です',
            color_required: '色は必須です',
            save_btn: '保存',
            delete_btn: '削除',
            delete_alert: 'タグを削除',
            delete_alert_msg: 'このタグを削除してもよろしいですか？',
            cancel: 'キャンセル',
            delete: 'タグを削除',
            tag_create_failed: 'タグの作成に失敗しました',
            tag_create_success: 'タグが正常に作成されました',
            tag_update_failed: 'タグの更新に失敗しました',
            tag_update_success: 'タグが正常に更新されました',
            tag_delete_failed: 'タグの削除に失敗しました',
            tag_delete_success: 'タグが正常に削除されました',
            place_holder: '例: 仕事、個人、勉強など。',
        }
    },
    task_screen:{
        index:{
            title: 'タスク',
            all_tasks: 'すべてのタスク',
            edit: 'タスクを編集',
            add: 'タスクを追加',
        },
        add:{
            desc_alert: 'タスクの説明は必須です',
            name_placeholder: 'タスク名を入力',
            save: '保存',
        },
        edit:{
            delete_alert_title: 'タスクを削除',
            delete_alert_msg: 'これにより関連するタイムレコードが削除されます。このタスクを削除してもよろしいですか？',
            cancel: 'キャンセル',
            delete: '削除',
            error: 'エラー',
            error_msg: 'これらのタイムレコードはこのタスクに関連付けられていません',
            ok: 'OK',
            name_placeholder: 'タスク名を入力',
            save: '保存',
            total_time: '総使用時間：',
            import: 'データをインポート',
            export: 'データをエクスポート',
        }
    },
    insights_screen:{
        layout:{
            title: 'インサイト',
        },
        index:{
            no_data: '表示するデータがありません',
            duration: '期間',
            select_duration: 'インサイトを表示する期間を選択',
            select_duration_label: 'インサイトを表示する期間を選択',
            daily: '今日',
            weekly: '週間',
            monthly: '月間',
            yearly: '年間',
            all: 'すべて',
            all_time: '全時間',
        },
    },
    components:{
        task_card:{
            no_time: '記録された時間がありません',
            edit: '編集',
        },
        tag_stat:{
            total_time: '総時間：',
            logs: 'ログ',
            log: 'ログ',
        },
        time_format:{
            today: '今日',
            monday: '月曜日',
            tuesday: '火曜日',
            wednesday: '水曜日',
            thursday: '木曜日',
            friday: '金曜日',
            saturday: '土曜日',
            sunday: '日曜日',
        }
    }
}

const de = {
    tracker_screen:{
        layout:{
            tracker: 'Tracker',
            tasks: 'Aufgaben',
            tags: 'Tags',
            insights: 'Einblicke',
            home: 'Startseite',
        },
        index:{
            title: 'Protokolle',
            no_logs: 'Keine Protokolle gefunden',
            questions: 'Was hast du gemacht?',
            tags: 'Tags',
            add_tag: 'Tag hinzufügen',
            save_btn: 'Speichern',
            oops_alert: 'Ups!',
            error_alert: 'Fehler',
            success_alert: 'Erfolg',
            no_time: 'Keine Zeit zum Protokollieren',
            no_task: 'Bitte wähle eine Aufgabe aus',
            task_create_failed: 'Aufgabe konnte nicht erstellt werden',
            log_create_failed: 'Zeiterfassung konnte nicht erstellt werden',
            log_create_success: 'Zeiterfassung erfolgreich erstellt',
            tag_create_failed: 'Tag konnte nicht erstellt werden',
            time_log: 'Zeiterfassung',
        },
        poromodo:{
            break_title: 'Fokussierungssitzung abgeschlossen',
            break_msg: 'Zeit für eine Pause!',
            break_complete: 'Pause abgeschlossen',
            break_complete_msg: 'Zeit zum Fokussieren!',
            continue: 'Fortsetzen',
            end_pomodoro: 'Pomodoro beenden',
            stop_pomodoro: 'Pomodoro verlassen',
            stop_pomodoro_msg: 'Dies stoppt den Pomodoro-Timer.',
            yes: 'Ja',
            no: 'Nein',
            break: 'Pause',
            pause: 'Pause',
        },
    },
    tag_screen:{
        layout:{
            title: 'Tags',
            add_tags: 'Tag hinzufügen'
        },
        index: {
            title: 'Tags',
        },
        add:{
            title: 'Tag hinzufügen',
            edit_tag: 'Tag bearbeiten',
            create_tag: 'Neuen Tag erstellen',
            tag_name: 'Tag-Name',
            tag_color: 'Tag-Farbe',
            name_required: 'Name ist erforderlich',
            color_required: 'Farbe ist erforderlich',
            save_btn: 'Speichern',
            delete_btn: 'Löschen',
            delete_alert: 'Tag löschen',
            delete_alert_msg: 'Sind Sie sicher, dass Sie diesen Tag löschen möchten?',
            cancel: 'Abbrechen',
            delete: 'Tag löschen',
            tag_create_failed: 'Tag konnte nicht erstellt werden',
            tag_create_success: 'Tag erfolgreich erstellt',
            tag_update_failed: 'Tag konnte nicht aktualisiert werden',
            tag_update_success: 'Tag erfolgreich aktualisiert',
            tag_delete_failed: 'Tag konnte nicht gelöscht werden',
            tag_delete_success: 'Tag erfolgreich gelöscht',
            place_holder: 'z.B. Arbeit, privat, Studium usw.',
        }
    },
    task_screen:{
        index:{
            title: 'Aufgaben',
            all_tasks: 'Alle Aufgaben',
            edit: 'Aufgabe bearbeiten',
            add: 'Aufgabe hinzufügen',
        },
        add:{
            desc_alert: 'Aufgabenbeschreibung ist erforderlich',
            name_placeholder: 'Aufgabenname eingeben',
            save: 'Speichern',
        },
        edit:{
            delete_alert_title: 'Aufgabe löschen',
            delete_alert_msg: 'Dies wird alle zugehörigen Zeitprotokolle löschen. Möchten Sie diese Aufgabe wirklich löschen?',
            cancel: 'Abbrechen',
            delete: 'Löschen',
            error: 'Fehler',
            error_msg: 'Diese Zeitprotokolle gehören nicht zu dieser Aufgabe',
            ok: 'OK',
            name_placeholder: 'Aufgabenname eingeben',
            save: 'Speichern',
            total_time: 'Gesamte Zeit verwendet:',
            import: 'Daten importieren',
            export: 'Daten exportieren',
        }
    },
    insights_screen:{
        layout:{
            title: 'Einblicke',
        },
        index:{
            no_data: 'Keine Daten angezeigt',
            duration: 'Dauer',
            select_duration: 'Dauer auswählen, um Einblicke anzuzeigen',
            select_duration_label: 'Dauer auswählen, um Einblicke anzuzeigen',
            daily: 'Heute',
            weekly: 'Wöchentlich',
            monthly: 'Monatlich',
            yearly: 'Jährlich',
            all: 'Alle',
            all_time: 'Alle Zeiten',
        },
    },
    components:{
        task_card:{
            no_time: 'Keine Zeit erfasst',
            edit: 'Bearbeiten',
        },
        tag_stat:{
            total_time: 'Gesamtzeit: ',
            logs: 'Logs',
            log: 'Log',
        },
        time_format:{
            today: 'Heute',
            monday: 'Montag',
            tuesday: 'Dienstag',
            wednesday: 'Mittwoch',
            thursday: 'Donnerstag',
            friday: 'Freitag',
            saturday: 'Samstag',
            sunday: 'Sonntag',
        }
    }
}

const ru = {
    tracker_screen:{
        layout:{
            tracker: 'Трекер',
            tasks: 'Задачи',
            tags: 'Теги',
            insights: 'Анализ',
            home: 'Главная',
        },
        index:{
            title: 'Логи',
            no_logs: 'Логи не найдены',
            questions: 'Что вы сделали?',
            tags: 'Теги',
            add_tag: 'Добавить тег',
            save_btn: 'Сохранить',
            oops_alert: 'Ой!',
            error_alert: 'Ошибка',
            success_alert: 'Успех',
            no_time: 'Нет времени для записи',
            no_task: 'Пожалуйста, выберите задачу',
            task_create_failed: 'Не удалось создать задачу',
            log_create_failed: 'Не удалось создать временной лог',
            log_create_success: 'Временной лог успешно создан',
            tag_create_failed: 'Не удалось создать тег',
            time_log: 'Временной лог',
        },
        poromodo:{
            break_title: 'Сеанс фокусировки завершен',
            break_msg: 'Время сделать перерыв!',
            break_complete: 'Сеанс перерыва завершен',
            break_complete_msg: 'Время для фокусировки!',
            continue: 'Продолжить',
            end_pomodoro: 'Закончить помодоро',
            stop_pomodoro: 'Прекратить помодоро',
            stop_pomodoro_msg: 'Это остановит таймер помодоро.',
            yes: 'Да',
            no: 'Нет',
            break: 'Перерыв',
            pause: 'Пауза',
        },
    },
    tag_screen:{
        layout:{
            title: 'Теги',
            add_tags: 'Добавить тег'
        },
        index: {
            title: 'Теги',
        },
        add:{
            title: 'Добавить тег',
            edit_tag: 'Редактировать тег',
            create_tag: 'Создать новый тег',
            tag_name: 'Имя тега',
            tag_color: 'Цвет тега',
            name_required: 'Имя обязательно',
            color_required: 'Цвет обязателен',
            save_btn: 'Сохранить',
            delete_btn: 'Удалить',
            delete_alert: 'Удалить тег',
            delete_alert_msg: 'Вы уверены, что хотите удалить этот тег?',
            cancel: 'Отмена',
            delete: 'Удалить тег',
            tag_create_failed: 'Не удалось создать тег',
            tag_create_success: 'Тег успешно создан',
            tag_update_failed: 'Не удалось обновить тег',
            tag_update_success: 'Тег успешно обновлен',
            tag_delete_failed: 'Не удалось удалить тег',
            tag_delete_success: 'Тег успешно удален',
            place_holder: 'Например: работа, личное, учеба и т.д.',
        }
    },
    task_screen:{
        index:{
            title: 'Задачи',
            all_tasks: 'Все задачи',
            edit: 'Редактировать задачу',
            add: 'Добавить задачу',
        },
        add:{
            desc_alert: 'Описание задачи обязательно',
            name_placeholder: 'Введите имя задачи',
            save: 'Сохранить',
        },
        edit:{
            delete_alert_title: 'Удалить задачу',
            delete_alert_msg: 'Это удалит все связанные временные записи. Вы уверены, что хотите удалить эту задачу?',
            cancel: 'Отмена',
            delete: 'Удалить',
            error: 'Ошибка',
            error_msg: 'Эти временные записи не относятся к этой задаче',
            ok: 'ОК',
            name_placeholder: 'Введите имя задачи',
            save: 'Сохранить',
            total_time: 'Общее время использования:',
            import: 'Импортировать данные',
            export: 'Экспортировать данные',
        }
    },
    insights_screen:{
        layout:{
            title: 'Анализ',
        },
        index:{
            no_data: 'Нет данных для отображения',
            duration: 'Продолжительность',
            select_duration: 'Выберите продолжительность для просмотра анализа',
            select_duration_label: 'Выберите продолжительность для просмотра анализа',
            daily: 'Сегодня',
            weekly: 'Еженедельно',
            monthly: 'Ежемесячно',
            yearly: 'Ежегодно',
            all: 'Все',
            all_time: 'Все время',
        },
    },
    components:{
        task_card:{
            no_time: 'Время не записано',
            edit: 'Редактировать',
        },
        tag_stat:{
            total_time: 'Общее время: ',
            logs: 'логи',
            log: 'лог',
        },
        time_format:{
            today: 'Сегодня',
            monday: 'Пн',
            tuesday: 'Вт',
            wednesday: 'Ср',
            thursday: 'Чт',
            friday: 'Пт',
            saturday: 'Сб',
            sunday: 'Вс',
        }
    }
}

const translations = {
    en: en,
    vi: vi,
    fr: fr,
    hi: hi,
    es: es,
    zh: zh,
    ko: ko,
    ja: ja,
    de: de,
    ru: ru,
}

const i18n = new I18n(translations)

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? 'en';

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

export default i18n;