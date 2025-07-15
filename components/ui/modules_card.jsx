import { TouchableOpacity } from 'react-native'
import { View } from 'react-native-reanimated/lib/typescript/Animated'

const ModuleCard = ({modileTitle, description, level, readDuration, fileSize = "6.9 MB", onPreview, onDownload, field}) => {
    return(
        <View style={styles.container}> 
            <View style={styles.contentSection}>
                <Text style={styles.title}>{moduleTitle}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.meta}>
                Level: {level} | <Text style={styles.bold}>{readDuration}</Text>
                </Text>

                <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.previewBtn} onPress={onPreview}>
                    <Text style={styles.previewText}>Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadBtn} onPress={onDownload}>
                    <Text style={styles.downloadText}>Download</Text>
                </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.previewBtn} onPress={onPreview}>
                    <Text style={styles.previewText}>Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadBtn} onPress={onDownload}>
                    <Text style={styles.downloadText}>Download</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.fileSection}>
                <View style={styles.pdfContainer}>
                <Image
                    source={require('../../assets/images/pdf_icon.png')} 
                    style={styles.pdfIcon}
                    resizeMode="contain"
                />
                </View>
                <Text style={styles.fileSize}>{fileSize}</Text>
            </View>
        </View>
    )
}