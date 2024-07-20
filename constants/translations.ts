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
            error: 'Error',
            requires: 'Name and Color are required',
            no_time: 'No time logged',
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
            label: 'Task Name',
        },
        edit:{
            label: 'Task Name',
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

    themes:{
        title: 'System Theme',
        dark_mode: 'Dark Mode',
        on: 'On',
        off: 'Off',
        colors: 'Colors',
        orange: 'Orange',
        yellow: 'Yellow',
        green: 'Green',
        blue: 'Blue',
        purple: 'Purple',
        pink: 'Pink',
        red: 'Red',
    },

    settings:{
        title: 'Settings',
        themes: 'Themes',
        goals: 'Goals',
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
    },

    loading_db: 'Loading Database...',

    goals_screen: {
        title: 'Goals are made to achieve!',
        dailyGoalTitile: 'Daily Time Goal',
        on: 'On',
        off: 'Off',
        inputPlaceholder: 'Enter Time Goal, e.g. 1h 30m',
        setBtn: 'Set',
        prevGoalTime: 'Previous Goal: ',
    },

    alert: {
        goalSet: 'Goal Set',
        goalSetMessage: 'Your goal has been successfully set!',
        ok: 'OK',
    }
}

const vi = {
    tracker_screen:{
        layout:{
            tracker: 'Theo dõi',
            tasks: 'Công Việc',
            tags: 'Thẻ',
            insights: 'Thông Tin Chi Tiết',
            home: 'Trang Chủ',
        },
        index:{
            title: 'Nhật Ký',
            no_logs: 'Không tìm thấy nhật ký',
            questions:'Bạn đã làm gì?',
            tags: 'Thẻ',
            add_tag: 'Thêm thẻ',
            save_btn: 'Lưu',
            oops_alert: 'Ối!',
            error_alert: 'Lỗi',
            success_alert: 'Thành công',
            no_time: 'Không có thời gian để ghi nhật ký',
            no_task: 'Vui lòng chọn một công việc',
            task_create_failed: 'Không tạo được công việc',
            log_create_failed: 'Không tạo được nhật ký thời gian',
            log_create_success: 'Tạo nhật ký thời gian thành công',
            tag_create_failed: 'Không tạo được thẻ nhật ký thời gian',
            time_log: 'Nhật Ký Thời Gian',
        },
        poromodo:{
            break_title: 'Hoàn Thành Phiên Tập Trung',
            break_msg: 'Đã đến lúc nghỉ ngơi!',
            break_complete: 'Hoàn Thành Phiên Nghỉ Ngơi',
            break_complete_msg: 'Đã đến lúc tập trung!',
            continue: 'Tiếp Tục',
            end_pomodoro: 'Kết Thúc Pomodoro',
            stop_pomodoro: 'Rời Khỏi Pomodoro',
            stop_pomodoro_msg: 'Điều này sẽ dừng bộ đếm pomodoro.',
            yes: 'Có',
            no: 'Không',
            break: 'Nghỉ Ngơi',
            pause: 'Tạm Dừng',
        },
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
            name_required: 'Cần có tên',
            color_required: 'Cần có màu',
            save_btn: 'Lưu',
            delete_btn: 'Xóa',
            delete_alert: 'Xóa Thẻ',
            delete_alert_msg: 'Bạn có chắc chắn muốn xóa thẻ này không?',
            cancel: 'Hủy',
            delete: 'Xóa Thẻ',
            tag_create_failed: 'Không tạo được thẻ',
            tag_create_success: 'Tạo thẻ thành công',
            tag_update_failed: 'Không cập nhật được thẻ',
            tag_update_success: 'Cập nhật thẻ thành công',
            tag_delete_failed: 'Không xóa được thẻ',
            tag_delete_success: 'Xóa thẻ thành công',
            place_holder: 'Ví dụ: công việc, cá nhân, học tập, v.v.',
            error: 'Lỗi',
            requires: 'Cần có tên và màu',
            no_time: 'Không có thời gian được ghi nhận',
        }
    },

    task_screen:{
        index:{
            title: 'Công Việc',
            all_tasks: 'Tất Cả Công Việc',
            edit: 'Chỉnh Sửa Công Việc',
            add: 'Thêm Công Việc',
        },
        add:{
            desc_alert: 'Cần mô tả công việc',
            name_placeholder: 'Nhập Tên Công Việc',
            save: 'Lưu',
            label: 'Tên Công Việc',
        },
        edit:{
            label: 'Tên Công Việc',
            delete_alert_title: 'Xóa Công Việc',
            delete_alert_msg: 'Điều này sẽ xóa tất cả các ghi chép thời gian liên quan. Bạn có chắc chắn muốn xóa công việc này không?',
            cancel: 'Hủy',
            delete: 'Xóa',
            error: 'Lỗi',
            error_msg: 'Những ghi chép thời gian này không thuộc về công việc này',
            ok: 'OK',
            name_placeholder: 'Nhập Tên Công Việc',
            save: 'Lưu',
            total_time: 'Tổng Thời Gian Sử Dụng:',
            import: 'Nhập Dữ Liệu',
            export: 'Xuất Dữ Liệu',
        }
    },
    
    insights_screen:{
        layout:{
            title: 'Thông Tin Chi Tiết',
        },
        index:{
            no_data: 'Không có dữ liệu để hiển thị',
            duration: 'Thời Lượng',
            select_duration: 'Chọn thời lượng để xem thông tin chi tiết',
            select_duration_label: 'Chọn thời lượng để xem thông tin chi tiết',
            daily: 'Hôm Nay',
            weekly: 'Hàng Tuần',
            monthly: 'Hàng Tháng',
            yearly: 'Hàng Năm',
            all: 'Tất Cả',
            all_time: 'Mọi Thời Gian',
        },
    },

    themes:{
        title: 'Chủ Đề Hệ Thống',
        dark_mode: 'Chế Độ Tối',
        on: 'Bật',
        off: 'Tắt',
        colors: 'Màu Sắc',
        orange: 'Cam',
        yellow: 'Vàng',
        green: 'Xanh Lá',
        blue: 'Xanh Dương',
        purple: 'Tím',
        pink: 'Hồng',
        red: 'Đỏ',
    },

    settings:{
        title: 'Cài Đặt',
        themes: 'Chủ Đề',
        goals: "Mục tiêu",
    },

    components:{
        task_card:{
            no_time: 'Không có thời gian được ghi nhận',
            edit: 'Chỉnh Sửa',
        },
        tag_stat:{
            total_time: 'Tổng thời gian: ',
            logs: 'nhật ký',
            log: 'nhật ký',
        },
        time_format:{
            today: 'Hôm Nay',
            monday: 'Thứ Hai',
            tuesday: 'Thứ Ba',
            wednesday: 'Thứ Tư',
            thursday: 'Thứ Năm',
            friday: 'Thứ Sáu',
            saturday: 'Thứ Bảy',
            sunday: 'Chủ Nhật',
        }
    },

    loading_db: 'Đang tải cơ sở dữ liệu...',

    goals_screen: {
        title: 'Mục tiêu được tạo ra để đạt được!',
        dailyGoalTitile: 'Mục tiêu thời gian hàng ngày',
        on: 'Bật',
        off: 'Tắt',
        inputPlaceholder: 'Nhập Mục tiêu thời gian, ví dụ: 1h 30m',
        setBtn: 'Đặt',
        prevGoalTime: 'Mục tiêu trước: ',
  },

  alert: {
    goalSet: 'Mục tiêu đã đặt', // Alert Title
    goalSetMessage: 'Mục tiêu của bạn đã được đặt thành công!', // Alert Message
    ok: 'OK' // Alert Button
  }

}

const fr = {
    tracker_screen:{
        layout:{
            tracker: 'Suivi',
            tasks: 'Tâches',
            tags: 'Étiquettes',
            insights: 'Aperçus',
            home: 'Accueil',
        },
        index:{
            title: 'Journaux',
            no_logs: 'Aucun journal trouvé',
            questions:'Qu\'avez-vous fait?',
            tags: 'Étiquettes',
            add_tag: 'Ajouter une étiquette',
            save_btn: 'Enregistrer',
            oops_alert: 'Oups!',
            error_alert: 'Erreur',
            success_alert: 'Succès',
            no_time: 'Aucun temps à enregistrer',
            no_task: 'Veuillez sélectionner une tâche',
            task_create_failed: 'Échec de la création de la tâche',
            log_create_failed: 'Échec de la création du journal de temps',
            log_create_success: 'Journal de temps créé avec succès',
            tag_create_failed: 'Échec de la création de l\'étiquette de journal de temps',
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
            stop_pomodoro_msg: 'Cela arrêtera le minuteur pomodoro.',
            yes: 'Oui',
            no: 'Non',
            break: 'Pause',
            pause: 'Pause',
        },
    },
    tag_screen:{
        layout:{
            title: 'Étiquettes',
            add_tags: 'Ajouter une étiquette'
        },
        index: {
            title: 'Étiquettes',
        },
        add:{
            title: 'Ajouter une Étiquette',
            edit_tag: 'Modifier l\'Étiquette',
            create_tag: 'Créer une Nouvelle Étiquette',
            tag_name: 'Nom de l\'Étiquette',
            tag_color: 'Couleur de l\'Étiquette',
            name_required: 'Le nom est requis',
            color_required: 'La couleur est requise',
            save_btn: 'Enregistrer',
            delete_btn: 'Supprimer',
            delete_alert: 'Supprimer l\'Étiquette',
            delete_alert_msg: 'Êtes-vous sûr de vouloir supprimer cette étiquette?',
            cancel: 'Annuler',
            delete: 'Supprimer l\'Étiquette',
            tag_create_failed: 'Échec de la création de l\'étiquette',
            tag_create_success: 'Étiquette créée avec succès',
            tag_update_failed: 'Échec de la mise à jour de l\'étiquette',
            tag_update_success: 'Étiquette mise à jour avec succès',
            tag_delete_failed: 'Échec de la suppression de l\'étiquette',
            tag_delete_success: 'Étiquette supprimée avec succès',
            place_holder: 'Par exemple: travail, personnel, étude, etc.',
            error: 'Erreur',
            requires: 'Le nom et la couleur sont requis',
            no_time: 'Aucun temps enregistré',
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
            name_placeholder: 'Entrez le nom de la tâche',
            save: 'Enregistrer',
            label: 'Nom de la Tâche',
        },
        edit:{
            label: 'Nom de la Tâche',
            delete_alert_title: 'Supprimer la Tâche',
            delete_alert_msg: 'Cela supprimera tous les enregistrements de temps associés. Êtes-vous sûr de vouloir supprimer cette tâche?',
            cancel: 'Annuler',
            delete: 'Supprimer',
            error: 'Erreur',
            error_msg: 'Ces enregistrements de temps n\'appartiennent pas à cette tâche',
            ok: 'OK',
            name_placeholder: 'Entrez le nom de la tâche',
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
            select_duration: 'Sélectionnez la durée pour voir les aperçus',
            select_duration_label: 'Sélectionnez la durée pour voir les aperçus',
            daily: 'Aujourd\'hui',
            weekly: 'Hebdomadaire',
            monthly: 'Mensuel',
            yearly: 'Annuel',
            all: 'Tout',
            all_time: 'Tous les temps',
        },
    },

    themes:{
        title: 'Thème du Système',
        dark_mode: 'Mode Sombre',
        on: 'Activé',
        off: 'Désactivé',
        colors: 'Couleurs',
        orange: 'Orange',
        yellow: 'Jaune',
        green: 'Vert',
        blue: 'Bleu',
        purple: 'Violet',
        pink: 'Rose',
        red: 'Rouge',
    },

    settings:{
        title: 'Paramètres',
        themes: 'Thèmes',
        goals: "Objectifs",
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
    },

    loading_db: 'Chargement de la base de données...',

    goals_screen: {
        title: 'Les objectifs sont faits pour être atteints!',
        dailyGoalTitile: 'Objectif de temps quotidien',
        on: 'Allumé',
        off: 'Éteint',
        inputPlaceholder: 'Entrez l\'objectif de temps, par ex. 1h 30m',
        setBtn: 'Définir',
        prevGoalTime: 'Objectif précédent: ',
      },

      alert: {
        goalSet: 'Objectif défini', // Alert Title
        goalSetMessage: 'Votre objectif a été défini avec succès!', // Alert Message
        ok: 'OK' // Alert Button
      }
}

const hi = {
    tracker_screen:{
        layout:{
            tracker: 'ट्रैकर',
            tasks: 'कार्य',
            tags: 'टैग',
            insights: 'जानकारियाँ',
            home: 'मुख्य पृष्ठ',
        },
        index:{
            title: 'लॉग्स',
            no_logs: 'कोई लॉग नहीं मिला',
            questions:'आपने क्या किया?',
            tags: 'टैग',
            add_tag: 'टैग जोड़ें',
            save_btn: 'सहेजें',
            oops_alert: 'उफ़!',
            error_alert: 'त्रुटि',
            success_alert: 'सफलता',
            no_time: 'लॉग करने का समय नहीं',
            no_task: 'कृपया एक कार्य चुनें',
            task_create_failed: 'कार्य बनाने में विफल',
            log_create_failed: 'टाइमलॉग बनाने में विफल',
            log_create_success: 'टाइमलॉग सफलतापूर्वक बनाया गया',
            tag_create_failed: 'टाइमलॉग टैग बनाने में विफल',
            time_log: 'समय लॉग',
        },
        poromodo:{
            break_title: 'फोकस सत्र पूरा हुआ',
            break_msg: 'आराम करने का समय!',
            break_complete: 'ब्रेक सत्र पूरा हुआ',
            break_complete_msg: 'फोकस करने का समय!',
            continue: 'जारी रखें',
            end_pomodoro: 'पॉमोडोरो समाप्त करें',
            stop_pomodoro: 'पॉमोडोरो छोड़ें',
            stop_pomodoro_msg: 'यह पॉमोडोरो टाइमर को रोक देगा।',
            yes: 'हां',
            no: 'नहीं',
            break: 'विराम',
            pause: 'रोकें',
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
            tag_name: 'टैग नाम',
            tag_color: 'टैग रंग',
            name_required: 'नाम आवश्यक है',
            color_required: 'रंग आवश्यक है',
            save_btn: 'सहेजें',
            delete_btn: 'हटाएं',
            delete_alert: 'टैग हटाएं',
            delete_alert_msg: 'क्या आप वाकई इस टैग को हटाना चाहते हैं?',
            cancel: 'रद्द करें',
            delete: 'टैग हटाएं',
            tag_create_failed: 'टैग बनाने में विफल',
            tag_create_success: 'टैग सफलतापूर्वक बनाया गया',
            tag_update_failed: 'टैग अपडेट करने में विफल',
            tag_update_success: 'टैग सफलतापूर्वक अपडेट किया गया',
            tag_delete_failed: 'टैग हटाने में विफल',
            tag_delete_success: 'टैग सफलतापूर्वक हटाया गया',
            place_holder: 'उदाहरण: काम, व्यक्तिगत, अध्ययन, आदि।',
            error: 'त्रुटि',
            requires: 'नाम और रंग आवश्यक हैं',
            no_time: 'कोई समय लॉग नहीं किया गया',
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
            label: 'कार्य का नाम',
        },
        edit:{
            label: 'कार्य का नाम',
            delete_alert_title: 'कार्य हटाएं',
            delete_alert_msg: 'यह सभी संबंधित समय रिकॉर्ड्स को हटा देगा। क्या आप इस कार्य को हटाना चाहते हैं?',
            cancel: 'रद्द करें',
            delete: 'हटाएं',
            error: 'त्रुटि',
            error_msg: 'ये समय रिकॉर्ड इस कार्य से संबंधित नहीं हैं',
            ok: 'ठीक है',
            name_placeholder: 'कार्य का नाम दर्ज करें',
            save: 'सहेजें',
            total_time: 'कुल उपयोग समय:',
            import: 'डेटा आयात करें',
            export: 'डेटा निर्यात करें',
        }
    },
    
    insights_screen:{
        layout:{
            title: 'जानकारियाँ',
        },
        index:{
            no_data: 'दिखाने के लिए कोई डेटा नहीं है',
            duration: 'अवधि',
            select_duration: 'जानकारियाँ देखने के लिए अवधि चुनें',
            select_duration_label: 'जानकारियाँ देखने के लिए अवधि चुनें',
            daily: 'आज',
            weekly: 'साप्ताहिक',
            monthly: 'मासिक',
            yearly: 'वार्षिक',
            all: 'सभी',
            all_time: 'सभी समय',
        },
    },

    themes:{
        title: 'सिस्टम थीम',
        dark_mode: 'डार्क मोड',
        on: 'चालू',
        off: 'बंद',
        colors: 'रंग',
        orange: 'नारंगी',
        yellow: 'पीला',
        green: 'हरा',
        blue: 'नीला',
        purple: 'बैंगनी',
        pink: 'गुलाबी',
        red: 'लाल',
    },

    settings:{
        title: 'सेटिंग्स',
        themes: 'थीम्स',
        goals: 'लक्ष्य',
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
    },

    loading_db: 'डेटाबेस लोड हो रहा है...',

    goals_screen: {
        title: 'लक्ष्य प्राप्त करने के लिए बनाए गए हैं!',
        dailyGoalTitile: 'दैनिक समय लक्ष्य',
        on: 'चालू',
        off: 'बंद',
        inputPlaceholder: 'समय लक्ष्य दर्ज करें, जैसे 1h 30m',
        setBtn: 'सेट करें',
        prevGoalTime: 'पिछला लक्ष्य: ',
      },
    
      alert: {
        goalSet: 'लक्ष्य सेट किया गया', // Alert Title
        goalSetMessage: 'आपका लक्ष्य सफलतापूर्वक सेट कर दिया गया है!', // Alert Message
        ok: 'ठीक है' // Alert Button
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
            questions:'¿Qué hiciste?',
            tags: 'Etiquetas',
            add_tag: 'Añadir etiqueta',
            save_btn: 'Guardar',
            oops_alert: '¡Vaya!',
            error_alert: 'Error',
            success_alert: 'Éxito',
            no_time: 'No hay tiempo para registrar',
            no_task: 'Por favor seleccione una tarea',
            task_create_failed: 'Fallo al crear la tarea',
            log_create_failed: 'Fallo al crear el registro de tiempo',
            log_create_success: 'Registro de tiempo creado con éxito',
            tag_create_failed: 'Fallo al crear la etiqueta de registro de tiempo',
            time_log: 'Registro de tiempo',
        },
        poromodo:{
            break_title: 'Sesión de enfoque completada',
            break_msg: '¡Es hora de tomar un descanso!',
            break_complete: 'Sesión de descanso completada',
            break_complete_msg: '¡Es hora de enfocarse!',
            continue: 'Continuar',
            end_pomodoro: 'Terminar Pomodoro',
            stop_pomodoro: 'Dejar Pomodoro',
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
            add_tags: 'Añadir etiqueta'
        },
        index: {
            title: 'Etiquetas',
        },
        add:{
            title: 'Añadir etiqueta',
            edit_tag: 'Editar etiqueta',
            create_tag: 'Crear nueva etiqueta',
            tag_name: 'Nombre de la etiqueta',
            tag_color: 'Color de la etiqueta',
            name_required: 'El nombre es obligatorio',
            color_required: 'El color es obligatorio',
            save_btn: 'Guardar',
            delete_btn: 'Eliminar',
            delete_alert: 'Eliminar etiqueta',
            delete_alert_msg: '¿Estás seguro de que quieres eliminar esta etiqueta?',
            cancel: 'Cancelar',
            delete: 'Eliminar etiqueta',
            tag_create_failed: 'Fallo al crear la etiqueta',
            tag_create_success: 'Etiqueta creada con éxito',
            tag_update_failed: 'Fallo al actualizar la etiqueta',
            tag_update_success: 'Etiqueta actualizada con éxito',
            tag_delete_failed: 'Fallo al eliminar la etiqueta',
            tag_delete_success: 'Etiqueta eliminada con éxito',
            place_holder: 'Ej.: trabajo, personal, estudio, etc.',
            error: 'Error',
            requires: 'El nombre y el color son obligatorios',
            no_time: 'No hay tiempo registrado',
        }
    },

    task_screen:{
        index:{
            title: 'Tareas',
            all_tasks: 'Todas las tareas',
            edit: 'Editar tarea',
            add: 'Añadir tarea',
        },
        add:{
            desc_alert: 'La descripción de la tarea es obligatoria',
            name_placeholder: 'Ingrese el nombre de la tarea',
            save: 'Guardar',
            label: 'Nombre de la tarea',
        },
        edit:{
            label: 'Nombre de la tarea',
            delete_alert_title: 'Eliminar tarea',
            delete_alert_msg: 'Esto eliminará todos los registros de tiempo relacionados. ¿Estás seguro de que quieres eliminar esta tarea?',
            cancel: 'Cancelar',
            delete: 'Eliminar',
            error: 'Error',
            error_msg: 'Estos registros de tiempo no pertenecen a esta tarea',
            ok: 'OK',
            name_placeholder: 'Ingrese el nombre de la tarea',
            save: 'Guardar',
            total_time: 'Tiempo total utilizado:',
            import: 'Importar datos',
            export: 'Exportar datos',
        }
    },
    
    insights_screen:{
        layout:{
            title: 'Perspectivas',
        },
        index:{
            no_data: 'No hay datos para mostrar',
            duration: 'Duración',
            select_duration: 'Seleccione la duración para ver las perspectivas',
            select_duration_label: 'Seleccione la duración para ver las perspectivas',
            daily: 'Hoy',
            weekly: 'Semanal',
            monthly: 'Mensual',
            yearly: 'Anual',
            all: 'Todo',
            all_time: 'Todo el tiempo',
        },
    },

    themes:{
        title: 'Tema del sistema',
        dark_mode: 'Modo oscuro',
        on: 'Encendido',
        off: 'Apagado',
        colors: 'Colores',
        orange: 'Naranja',
        yellow: 'Amarillo',
        green: 'Verde',
        blue: 'Azul',
        purple: 'Púrpura',
        pink: 'Rosa',
        red: 'Rojo',
    },

    settings:{
        title: 'Configuraciones',
        themes: 'Temas',
        goals: 'Metas',
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
    },

    loading_db: 'Cargando base de datos...',

    goals_screen: {
        title: '¡Las metas están hechas para lograrse!',
        dailyGoalTitile: 'Meta de tiempo diaria',
        on: 'Encendido',
        off: 'Apagado',
        inputPlaceholder: 'Ingrese el objetivo de tiempo, ej. 1h 30m',
        setBtn: 'Establecer',
        prevGoalTime: 'Meta anterior: ',
    },

    alert: {
        goalSet: 'Meta establecida', // Alert Title
        goalSetMessage: '¡Su meta ha sido establecida con éxito!', // Alert Message
        ok: 'OK' // Alert Button
      }
}

const zh = {
    tracker_screen:{
        layout:{
            tracker: '追踪器',
            tasks: '任务',
            tags: '标签',
            insights: '洞察',
            home: '主页',
        },
        index:{
            title: '日志',
            no_logs: '没有找到日志',
            questions:'你做了什么?',
            tags: '标签',
            add_tag: '添加标签',
            save_btn: '保存',
            oops_alert: '哎呀!',
            error_alert: '错误',
            success_alert: '成功',
            no_time: '没有时间记录',
            no_task: '请选择一个任务',
            task_create_failed: '创建任务失败',
            log_create_failed: '创建时间日志失败',
            log_create_success: '时间日志创建成功',
            tag_create_failed: '创建时间日志标签失败',
            time_log: '时间日志',
        },
        poromodo:{
            break_title: '专注会话完成',
            break_msg: '是时候休息了!',
            break_complete: '休息会话完成',
            break_complete_msg: '是时候专注了!',
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
            delete_alert_msg: '你确定要删除这个标签吗?',
            cancel: '取消',
            delete: '删除标签',
            tag_create_failed: '创建标签失败',
            tag_create_success: '标签创建成功',
            tag_update_failed: '更新标签失败',
            tag_update_success: '标签更新成功',
            tag_delete_failed: '删除标签失败',
            tag_delete_success: '标签删除成功',
            place_holder: '例如：工作，个人，学习等。',
            error: '错误',
            requires: '名称和颜色是必需的',
            no_time: '没有时间记录',
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
            label: '任务名称',
        },
        edit:{
            label: '任务名称',
            delete_alert_title: '删除任务',
            delete_alert_msg: '这将删除所有相关的时间记录。你确定要删除这个任务吗?',
            cancel: '取消',
            delete: '删除',
            error: '错误',
            error_msg: '这些时间记录不属于这个任务',
            ok: '好的',
            name_placeholder: '输入任务名称',
            save: '保存',
            total_time: '使用的总时间:',
            import: '导入数据',
            export: '导出数据',
        }
    },
    
    insights_screen:{
        layout:{
            title: '洞察',
        },
        index:{
            no_data: '没有数据显示',
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

    themes:{
        title: '系统主题',
        dark_mode: '黑暗模式',
        on: '开启',
        off: '关闭',
        colors: '颜色',
        orange: '橙色',
        yellow: '黄色',
        green: '绿色',
        blue: '蓝色',
        purple: '紫色',
        pink: '粉色',
        red: '红色',
    },

    settings:{
        title: '设置',
        themes: '主题',
        goals: '目标',
    },

    components:{
        task_card:{
            no_time: '没有时间记录',
            edit: '编辑',
        },
        tag_stat:{
            total_time: '总时间: ',
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
    },

    loading_db: '加载数据库...',

    goals_screen: {
        title: '目标是为了实现!',
        dailyGoalTitile: '每日时间目标',
        on: '开',
        off: '关',
        inputPlaceholder: '输入时间目标，例如 1小时 30分钟',
        setBtn: '设置',
        prevGoalTime: '上一个目标: ',
      },

      alert: {
        goalSet: '目标已设置', // Alert Title
        goalSetMessage: '您的目标已成功设置!', // Alert Message
        ok: 'OK' // Alert Button
      }
}

const ko = {
    tracker_screen:{
        layout:{
            tracker: '트래커',
            tasks: '작업',
            tags: '태그',
            insights: '인사이트',
            home: '홈',
        },
        index:{
            title: '로그',
            no_logs: '로그가 없습니다',
            questions:'무엇을 하셨나요?',
            tags: '태그',
            add_tag: '태그 추가',
            save_btn: '저장',
            oops_alert: '이런!',
            error_alert: '오류',
            success_alert: '성공',
            no_time: '기록할 시간이 없습니다',
            no_task: '작업을 선택해주세요',
            task_create_failed: '작업 생성 실패',
            log_create_failed: '타임로그 생성 실패',
            log_create_success: '타임로그가 성공적으로 생성되었습니다',
            tag_create_failed: '타임로그 태그 생성 실패',
            time_log: '시간 기록',
        },
        poromodo:{
            break_title: '포커스 세션 완료',
            break_msg: '쉬는 시간이 되었습니다!',
            break_complete: '쉬는 세션 완료',
            break_complete_msg: '집중할 시간입니다!',
            continue: '계속',
            end_pomodoro: '포모도로 종료',
            stop_pomodoro: '포모도로 나가기',
            stop_pomodoro_msg: '이 작업은 포모도로 타이머를 중지합니다.',
            yes: '예',
            no: '아니요',
            break: '휴식',
            pause: '일시정지',
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
            create_tag: '새 태그 생성',
            tag_name: '태그 이름',
            tag_color: '태그 색상',
            name_required: '이름은 필수입니다',
            color_required: '색상은 필수입니다',
            save_btn: '저장',
            delete_btn: '삭제',
            delete_alert: '태그 삭제',
            delete_alert_msg: '이 태그를 삭제하시겠습니까?',
            cancel: '취소',
            delete: '태그 삭제',
            tag_create_failed: '태그 생성 실패',
            tag_create_success: '태그가 성공적으로 생성되었습니다',
            tag_update_failed: '태그 업데이트 실패',
            tag_update_success: '태그가 성공적으로 업데이트되었습니다',
            tag_delete_failed: '태그 삭제 실패',
            tag_delete_success: '태그가 성공적으로 삭제되었습니다',
            place_holder: '예: 작업, 개인, 공부 등',
            error: '오류',
            requires: '이름과 색상은 필수입니다',
            no_time: '기록된 시간이 없습니다',
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
            desc_alert: '작업 설명은 필수입니다',
            name_placeholder: '작업 이름을 입력하세요',
            save: '저장',
            label: '작업 이름',
        },
        edit:{
            label: '작업 이름',
            delete_alert_title: '작업 삭제',
            delete_alert_msg: '이 작업을 삭제하면 모든 관련 시간 기록이 삭제됩니다. 이 작업을 삭제하시겠습니까?',
            cancel: '취소',
            delete: '삭제',
            error: '오류',
            error_msg: '이 시간 기록은 이 작업에 속하지 않습니다',
            ok: '확인',
            name_placeholder: '작업 이름을 입력하세요',
            save: '저장',
            total_time: '총 사용 시간:',
            import: '데이터 가져오기',
            export: '데이터 내보내기',
        }
    },
    
    insights_screen:{
        layout:{
            title: '인사이트',
        },
        index:{
            no_data: '표시할 데이터가 없습니다',
            duration: '기간',
            select_duration: '인사이트를 보려면 기간을 선택하세요',
            select_duration_label: '인사이트를 보려면 기간을 선택하세요',
            daily: '오늘',
            weekly: '주간',
            monthly: '월간',
            yearly: '연간',
            all: '전체',
            all_time: '전체 시간',
        },
    },

    themes:{
        title: '시스템 테마',
        dark_mode: '다크 모드',
        on: '켜짐',
        off: '꺼짐',
        colors: '색상',
        orange: '주황색',
        yellow: '노란색',
        green: '녹색',
        blue: '파란색',
        purple: '보라색',
        pink: '분홍색',
        red: '빨간색',
    },

    settings:{
        title: '설정',
        themes: '테마',
        goals: '목표',
    },

    components:{
        task_card:{
            no_time: '기록된 시간이 없습니다',
            edit: '편집',
        },
        tag_stat:{
            total_time: '총 시간: ',
            logs: '로그',
            log: '로그',
        },
        time_format:{
            today: '오늘',
            monday: '월',
            tuesday: '화',
            wednesday: '수',
            thursday: '목',
            friday: '금',
            saturday: '토',
            sunday: '일',
        }
    },

    loading_db: '데이터베이스 로드 중...',

    goals_screen: {
        title: '목표는 달성하기 위해서입니다!',
        dailyGoalTitile: '일일 시간 목표',
        on: '켜짐',
        off: '꺼짐',
        inputPlaceholder: '시간 목표 입력, 예: 1시간 30분',
        setBtn: '설정',
        prevGoalTime: '이전 목표: ',
      },

      alert: {
        goalSet: '목표 설정됨', // Alert Title
        goalSetMessage: '목표가 성공적으로 설정되었습니다!', // Alert Message
        ok: 'OK' // Alert Button
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
            questions:'何をしましたか?',
            tags: 'タグ',
            add_tag: 'タグを追加',
            save_btn: '保存',
            oops_alert: 'おっと!',
            error_alert: 'エラー',
            success_alert: '成功',
            no_time: 'ログする時間がありません',
            no_task: 'タスクを選択してください',
            task_create_failed: 'タスクの作成に失敗しました',
            log_create_failed: 'タイムログの作成に失敗しました',
            log_create_success: 'タイムログが正常に作成されました',
            tag_create_failed: 'タイムログタグの作成に失敗しました',
            time_log: 'タイムログ',
        },
        poromodo:{
            break_title: 'フォーカスセッション完了',
            break_msg: '休憩の時間です！',
            break_complete: '休憩セッション完了',
            break_complete_msg: '集中する時間です！',
            continue: '続ける',
            end_pomodoro: 'ポモドーロ終了',
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
            tag_color: 'タグカラー',
            name_required: '名前は必須です',
            color_required: 'カラーは必須です',
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
            place_holder: '例：仕事、個人、勉強など。',
            error: 'エラー',
            requires: '名前とカラーは必須です',
            no_time: 'ログされた時間がありません',
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
            name_placeholder: 'タスク名を入力してください',
            save: '保存',
            label: 'タスク名',
        },
        edit:{
            label: 'タスク名',
            delete_alert_title: 'タスクを削除',
            delete_alert_msg: 'これによりすべての関連する時間記録が削除されます。このタスクを削除してもよろしいですか？',
            cancel: 'キャンセル',
            delete: '削除',
            error: 'エラー',
            error_msg: 'これらの時間記録はこのタスクに属していません',
            ok: 'OK',
            name_placeholder: 'タスク名を入力してください',
            save: '保存',
            total_time: '使用した総時間:',
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
            select_duration: 'インサイトを見るために期間を選択してください',
            select_duration_label: 'インサイトを見るために期間を選択してください',
            daily: '今日',
            weekly: '週間',
            monthly: '月間',
            yearly: '年間',
            all: 'すべて',
            all_time: '全期間',
        },
    },

    themes:{
        title: 'システムテーマ',
        dark_mode: 'ダークモード',
        on: 'オン',
        off: 'オフ',
        colors: 'カラー',
        orange: 'オレンジ',
        yellow: 'イエロー',
        green: 'グリーン',
        blue: 'ブルー',
        purple: 'パープル',
        pink: 'ピンク',
        red: 'レッド',
    },

    settings:{
        title: '設定',
        themes: 'テーマ',
        goals: '目標',
    },

    components:{
        task_card:{
            no_time: 'ログされた時間がありません',
            edit: '編集',
        },
        tag_stat:{
            total_time: '総時間: ',
            logs: 'ログ',
            log: 'ログ',
        },
        time_format:{
            today: '今日',
            monday: '月',
            tuesday: '火',
            wednesday: '水',
            thursday: '木',
            friday: '金',
            saturday: '土',
            sunday: '日',
        }
    },

    loading_db: 'データベースをロードしています...',

    goals_screen: {
        title: '目標は達成するために作られています！',
        dailyGoalTitile: '毎日の目標時間',
        on: 'オン',
        off: 'オフ',
        inputPlaceholder: '目標時間を入力してください, 例: 1時間 30分',
        setBtn: '設定',
        prevGoalTime: '前の目標: ',
      },

      alert: {
        goalSet: '目標設定', // Alert Title
        goalSetMessage: '目標が正常に設定されました!', // Alert Message
        ok: 'OK' // Alert Button
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
            oops_alert: 'Hoppla!',
            error_alert: 'Fehler',
            success_alert: 'Erfolg',
            no_time: 'Keine Zeit zum Protokollieren',
            no_task: 'Bitte wähle eine Aufgabe aus',
            task_create_failed: 'Fehler beim Erstellen der Aufgabe',
            log_create_failed: 'Fehler beim Erstellen des Zeitprotokolls',
            log_create_success: 'Zeitprotokoll erfolgreich erstellt',
            tag_create_failed: 'Fehler beim Erstellen des Tags für das Zeitprotokoll',
            time_log: 'Zeitprotokoll',
        },
        poromodo:{
            break_title: 'Fokus-Sitzung abgeschlossen',
            break_msg: 'Zeit für eine Pause!',
            break_complete: 'Pausensitzung abgeschlossen',
            break_complete_msg: 'Zeit sich zu konzentrieren!',
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
            delete_alert_msg: 'Bist du sicher, dass du diesen Tag löschen möchtest?',
            cancel: 'Abbrechen',
            delete: 'Tag löschen',
            tag_create_failed: 'Fehler beim Erstellen des Tags',
            tag_create_success: 'Tag erfolgreich erstellt',
            tag_update_failed: 'Fehler beim Aktualisieren des Tags',
            tag_update_success: 'Tag erfolgreich aktualisiert',
            tag_delete_failed: 'Fehler beim Löschen des Tags',
            tag_delete_success: 'Tag erfolgreich gelöscht',
            place_holder: 'z.B. Arbeit, persönlich, Studium usw.',
            error: 'Fehler',
            requires: 'Name und Farbe sind erforderlich',
            no_time: 'Keine Zeit protokolliert',
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
            name_placeholder: 'Aufgabennamen eingeben',
            save: 'Speichern',
            label: 'Aufgabenname',
        },
        edit:{
            label: 'Aufgabenname',
            delete_alert_title: 'Aufgabe löschen',
            delete_alert_msg: 'Dies löscht alle zugehörigen Zeitaufzeichnungen. Bist du sicher, dass du diese Aufgabe löschen möchtest?',
            cancel: 'Abbrechen',
            delete: 'Löschen',
            error: 'Fehler',
            error_msg: 'Diese Zeitaufzeichnungen gehören nicht zu dieser Aufgabe',
            ok: 'OK',
            name_placeholder: 'Aufgabennamen eingeben',
            save: 'Speichern',
            total_time: 'Gesamte genutzte Zeit:',
            import: 'Daten importieren',
            export: 'Daten exportieren',
        }
    },
    
    insights_screen:{
        layout:{
            title: 'Einblicke',
        },
        index:{
            no_data: 'Keine Daten zum Anzeigen',
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

    themes:{
        title: 'Systemthema',
        dark_mode: 'Dunkelmodus',
        on: 'Ein',
        off: 'Aus',
        colors: 'Farben',
        orange: 'Orange',
        yellow: 'Gelb',
        green: 'Grün',
        blue: 'Blau',
        purple: 'Lila',
        pink: 'Rosa',
        red: 'Rot',
    },

    settings:{
        title: 'Einstellungen',
        themes: 'Themen',
        goals: 'Ziele',
    },

    components:{
        task_card:{
            no_time: 'Keine Zeit protokolliert',
            edit: 'Bearbeiten',
        },
        tag_stat:{
            total_time: 'Gesamtzeit: ',
            logs: 'Protokolle',
            log: 'Protokoll',
        },
        time_format:{
            today: 'Heute',
            monday: 'Mo',
            tuesday: 'Di',
            wednesday: 'Mi',
            thursday: 'Do',
            friday: 'Fr',
            saturday: 'Sa',
            sunday: 'So',
        }
    },

    loading_db: 'Datenbank wird geladen...',

    goals_screen: {
        title: 'Ziele sind da, um erreicht zu werden!',
        dailyGoalTitile: 'Tägliches Zeit-Ziel',
        on: 'Ein',
        off: 'Aus',
        inputPlaceholder: 'Zeit-Ziel eingeben, z.B. 1h 30m',
        setBtn: 'Setzen',
        prevGoalTime: 'Vorheriges Ziel: ',
      },

      alert: {
        goalSet: 'Ziel gesetzt', // Alert Title
        goalSetMessage: 'Ihr Ziel wurde erfolgreich gesetzt!', // Alert Message
        ok: 'OK' // Alert Button
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
            title: 'Журналы',
            no_logs: 'Журналы не найдены',
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
            log_create_failed: 'Не удалось создать запись времени',
            log_create_success: 'Запись времени успешно создана',
            tag_create_failed: 'Не удалось создать тег для записи времени',
            time_log: 'Запись времени',
        },
        poromodo:{
            break_title: 'Сессия фокуса завершена',
            break_msg: 'Время для перерыва!',
            break_complete: 'Сессия перерыва завершена',
            break_complete_msg: 'Время сосредоточиться!',
            continue: 'Продолжить',
            end_pomodoro: 'Закончить Помодоро',
            stop_pomodoro: 'Выйти из Помодоро',
            stop_pomodoro_msg: 'Это остановит таймер Помодоро.',
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
            tag_name: 'Название тега',
            tag_color: 'Цвет тега',
            name_required: 'Имя обязательно',
            color_required: 'Цвет обязателен',
            save_btn: 'Сохранить',
            delete_btn: 'Удалить',
            delete_alert: 'Удалить тег',
            delete_alert_msg: 'Вы уверены, что хотите удалить этот тег?',
            cancel: 'Отменить',
            delete: 'Удалить тег',
            tag_create_failed: 'Не удалось создать тег',
            tag_create_success: 'Тег успешно создан',
            tag_update_failed: 'Не удалось обновить тег',
            tag_update_success: 'Тег успешно обновлен',
            tag_delete_failed: 'Не удалось удалить тег',
            tag_delete_success: 'Тег успешно удален',
            place_holder: 'Например, работа, личное, учеба и т.д.',
            error: 'Ошибка',
            requires: 'Имя и цвет обязательны',
            no_time: 'Время не записано',
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
            name_placeholder: 'Введите название задачи',
            save: 'Сохранить',
            label: 'Название задачи',
        },
        edit:{
            label: 'Название задачи',
            delete_alert_title: 'Удалить задачу',
            delete_alert_msg: 'Это удалит все связанные записи времени. Вы уверены, что хотите удалить эту задачу?',
            cancel: 'Отменить',
            delete: 'Удалить',
            error: 'Ошибка',
            error_msg: 'Эти записи времени не принадлежат этой задаче',
            ok: 'OK',
            name_placeholder: 'Введите название задачи',
            save: 'Сохранить',
            total_time: 'Общее использованное время:',
            import: 'Импорт данных',
            export: 'Экспорт данных',
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
            all_time: 'Всё время',
        },
    },

    themes:{
        title: 'Тема системы',
        dark_mode: 'Тёмный режим',
        on: 'Вкл',
        off: 'Выкл',
        colors: 'Цвета',
        orange: 'Оранжевый',
        yellow: 'Жёлтый',
        green: 'Зелёный',
        blue: 'Синий',
        purple: 'Фиолетовый',
        pink: 'Розовый',
        red: 'Красный',
    },

    settings:{
        title: 'Настройки',
        themes: 'Темы',
        goals: 'Цели',
    },

    components:{
        task_card:{
            no_time: 'Время не записано',
            edit: 'Редактировать',
        },
        tag_stat:{
            total_time: 'Общее время: ',
            logs: 'записи',
            log: 'запись',
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
    },

    loading_db: 'Загрузка базы данных...',

    goals_screen: {
        title: 'Цели созданы для достижения!',
        dailyGoalTitile: 'Ежедневная цель по времени',
        on: 'Вкл',
        off: 'Выкл',
        inputPlaceholder: 'Введите цель по времени, напр. 1ч 30м',
        setBtn: 'Установить',
        prevGoalTime: 'Предыдущая цель: ',
      },

      alert: {
        goalSet: 'Цель установлена', // Alert Title
        goalSetMessage: 'Ваша цель успешно установлена!', // Alert Message
        ok: 'OK' // Alert Button
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