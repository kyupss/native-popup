import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	Animated,
	Dimensions,
	Alert
} from "react-native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Popup = () => {
	const [data, setData] = useState({});
	const [positionView, setPositionView] = useState(new Animated.Value(HEIGHT));
	const [opacity, setOpacity] = useState(new Animated.Value(0));
	const [positionPopup, setPositionPopup] = useState(
		new Animated.Value(HEIGHT)
	);
	const [popupHeight, setPopupHeight] = useState(0);

	Popup.show = ({ ...config }) => {
		start(config);
	};

	Popup.hide = () => {
		hidePopup();
	};

	const start = ({ ...config }) => {
		setData({
			title: config.title,
			type: config.type,
			textBody: config.textBody,
			button: config.button || true,
			buttonText: config.buttonText || "Ok",
			callback:
				config.callback !== undefined ? config.callback : defaultCallback(),
			background: config.background || "rgba(0, 0, 0, 0.5)",
			timing: config.timing,
			autoClose: config.autoClose || false
		});

		Animated.sequence([
			Animated.timing(positionView, {
				toValue: 0,
				duration: 100
			}),
			Animated.timing(opacity, {
				toValue: 1,
				duration: 300
			}),
			Animated.spring(positionPopup, {
				toValue: HEIGHT / 2 - popupHeight / 2,
				bounciness: 15,
				useNativeDriver: true
			})
		]).start();

		if (config.autoClose && config.timing !== 0) {
			const duration = config.timing > 0 ? config.timing : 5000;
			setTimeout(() => {
				hidePopup();
			}, duration);
		};
	};

	const hidePopup = () => {
		Animated.sequence([
			Animated.timing(positionPopup, {
				toValue: HEIGHT,
				duration: 250,
				useNativeDriver: true
			}),
			Animated.timing(opacity, {
				toValue: 0,
				duration: 300
			}),
			Animated.timing(positionView, {
				toValue: HEIGHT,
				duration: 100
			})
		]).start();
	};

	const defaultCallback = () => {
		return Alert.alert("Callback!", "Callback complete!", [
			{ text: "Ok", onPress: () => hidePopup() }
		]);
	};

	const handleImage = type => {
		switch (type) {
			case "Success":
				return require("../../assets/Success.png");
			case "Danger":
				return require("../../assets/Error.png");
			case "Warning":
				return require("../../assets/Warning.png");
		}
	};

	const {
		title,
		type,
		textBody,
		button,
		buttonText,
		callback,
		background
	} = data;

	return (
		<Animated.View
			style={[
				styles.Container,
				{
					backgroundColor: background || "transparent",
					opacity: opacity,
					transform: [{ translateY: positionView }]
				}
			]}
		>
			<Animated.View
				onLayout={event => {
					setPopupHeight(event.nativeEvent.layout.height);
				}}
				style={[
					styles.Message,
					{
						transform: [{ translateY: positionPopup }]
					}
				]}
			>
				<View style={styles.Header} />
				<Image
					source={handleImage(type)}
					resizeMode="contain"
					style={styles.Image}
				/>
				<View style={styles.Content}>
					<Text style={styles.Title}>{title}</Text>
					<Text style={styles.Desc}>{textBody}</Text>
					{button && (
						<TouchableOpacity
							style={[styles.Button, styles[type]]}
							onPress={callback}
						>
							<Text style={styles.TextButton}>{buttonText}</Text>
						</TouchableOpacity>
					)}
				</View>
			</Animated.View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	Container: {
		position: "absolute",
		zIndex: 9,
		width: WIDTH,
		height: HEIGHT,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		alignItems: "center",
		top: 0,
		left: 0
	},
	Message: {
		maxWidth: 300,
		width: 230,
		minHeight: 300,
		backgroundColor: "#fff",
		borderRadius: 30,
		alignItems: "center",
		overflow: "hidden",
		position: "absolute"
	},
	Content: {
		padding: 20,
		alignItems: "center"
	},
	Header: {
		height: 230,
		width: 230,
		backgroundColor: "#FBFBFB",
		borderRadius: 100,
		marginTop: -120
	},
	Image: {
		width: 150,
		height: 80,
		position: "absolute",
		top: 20
	},
	Title: {
		fontWeight: "bold",
		fontSize: 18,
		color: "#333"
	},
	Desc: {
		textAlign: "center",
		color: "#666",
		marginTop: 10
	},
	Button: {
		borderRadius: 50,
		height: 40,
		width: 130,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 30
	},
	TextButton: {
		color: "#fff",
		fontWeight: "bold"
	},
	Success: {
		backgroundColor: "#AAF577",
		shadowColor: "#AAF577",
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,
		elevation: 11
	},
	Danger: {
		backgroundColor: "#F29091",
		shadowColor: "#F29091",
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,
		elevation: 11
	},
	Warning: {
		backgroundColor: "#fbd10d",
		shadowColor: "#fbd10d",
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,
		elevation: 11
	}
});

export default Popup;
